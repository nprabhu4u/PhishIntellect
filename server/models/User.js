import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    usertype: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare given password with stored hashed password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate an auth token for the user
UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, usertype: this.usertype },
    "good-day",
    {
      expiresIn: "6d", // Token expiry time
    }
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// Remove specific token
UserSchema.methods.removeToken = async function (token) {
  this.tokens = this.tokens.filter((t) => t.token !== token);
  await this.save();
};

const User = mongoose.model("User", UserSchema);

export default User;

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
const PORT = 8080;

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from the server");
});

app.use("/api/auth", UserRoutes);

const MONGO_URI =
  "mongodb+srv://karthickthasans:admin@cluster0.veagm.mongodb.net/PhishIntellect?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server listening to Port ${PORT}...`);
});

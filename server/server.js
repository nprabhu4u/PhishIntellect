import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server listening to Port ${PORT}...`);
});

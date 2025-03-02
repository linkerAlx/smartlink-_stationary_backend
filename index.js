import express from "express";
import cors from "cors";
import { userRoutes } from "./routes.js/user.routes.js";
import { connectDB } from "./mongodb/db.js";

const app = express(); // GIVE ACCESS TO USE BACKEND FUNCTIONALITIES

app.use(express.json()); // GIVE ACCESS TO SEND DATA IN BACKEND
app.use(cors()); // GIVE PERMISSION TO ACCESS BACKEND SERVER

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// USER
app.use("/user", userRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log("Error listening", error);
  }
});

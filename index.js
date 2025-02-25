import express from "express";
import cors from "cors";
import { userRoutes } from "./routes.js/user.routes.js";

const app = express(); // GIVE ACCESS TO USE BACKEND FUNCTIONALITIES
app.use(cors()); // GIVE PERMISSION TO ACCESS BACKEND SERVER

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// USER
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`); // CHECK IF THE SERVER IS WORKING
});

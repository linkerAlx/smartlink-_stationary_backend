import express from "express";
import { create_user, login_user } from "../controllers.js/user.controller.js";

const userRoutes = express.Router();

//  http://localhost:3000/user/create_user
userRoutes.route("/create_user").post(create_user);

//  http://localhost:3000/user/login_user
userRoutes.route("/login_user").post(login_user);

export { userRoutes };

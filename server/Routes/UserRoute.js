import express from "express";
import { loginUser, createUser } from "../Controlers/userController.js";


export const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/register", createUser)
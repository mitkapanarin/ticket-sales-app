import express from "express";
import { loginUser, createUser, updateUserData } from "../Controlers/userController.js";


export const UserRouter = express.Router();

// Authentication Routes
UserRouter.post("/register", createUser);
UserRouter.post("/login", loginUser);

// User Data Update Routes
UserRouter.put("/update/:id", updateUserData);
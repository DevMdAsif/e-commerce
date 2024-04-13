import express from "express";
import { handleLogOut, handleLogin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogOut);

export default authRouter;

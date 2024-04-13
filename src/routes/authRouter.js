import express from "express";
import { handleLogin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", handleLogin);

export default authRouter;

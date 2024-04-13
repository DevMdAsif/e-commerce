import express from "express";
import { handleLogOut, handleLogin } from "../controllers/authController.js";
import { isLoggedIn, isLoggedOut } from "../middlewares/Auth.js";

const authRouter = express.Router();

authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogOut);

export default authRouter;

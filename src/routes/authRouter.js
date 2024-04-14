import express from "express";
import { handleLogOut, handleLogin } from "../controllers/authController.js";
import { isLoggedIn, isLoggedOut } from "../middlewares/Auth.js";
import { validateUserLogin } from "../validators/auth.js";
import runValidataon from "../validators/index.js";

const authRouter = express.Router();

authRouter.post(
    "/login",
    validateUserLogin,
    runValidataon,
    isLoggedOut,
    handleLogin
);
authRouter.post("/logout", isLoggedIn, handleLogOut);

export default authRouter;

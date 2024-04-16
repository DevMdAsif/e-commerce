import express from "express";
import {
    handleLogOut,
    handleLogin,
    handleRefreshToken,
} from "../controllers/authController.js";
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
authRouter.get("/refresh-token", handleRefreshToken);

authRouter.post("/logout", isLoggedIn, handleLogOut);

export default authRouter;

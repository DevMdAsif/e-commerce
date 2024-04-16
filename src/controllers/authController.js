import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { successResponse } from "./responseController.js";
import createJWT from "../helper/createJWT.js";
import { jwt_Access_Key, jwt_Refresh_Key } from "../serect.js";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        if (user.isBanned) {
            return res.status(401).json({
                message: "you are banned, please conteact authority",
            });
        }

        const token = createJWT({ user }, jwt_Access_Key, "15m");

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
        });

        const refreshToken = createJWT({ user }, jwt_Refresh_Key, "7d");

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
        });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return successResponse(res, {
            statusCode: 200,
            message: "Login successful",
            payload: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
};

const handleRefreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        const decudedToken = jwt.verify(oldRefreshToken, jwt_Refresh_Key);

        if (!decudedToken) {
            return res.status(401).json({
                message: "unauthorized access",
            });
        }

        const token = createJWT(
            { user: decudedToken.user },
            jwt_Access_Key,
            "15m"
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
        });

        return successResponse(res, {
            statusCode: 200,
            message: "Token refreshed",
        });
    } catch (error) {
        return next(error);
    }
};

const handleLogOut = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return successResponse(res, {
            statusCode: 200,
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
};

export { handleLogin, handleLogOut, handleRefreshToken };

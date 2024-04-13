import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { successResponse } from "./responseController.js";
import createJWT from "../helper/createJWT.js";
import { jwt_Activation_Key } from "../serect.js";

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

        const token = createJWT(
            { userId: user._id },
            jwt_Activation_Key,
            "15m"
        );

        res.cookie("token", token, {
            http: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
        });
        return successResponse(res, {
            statusCode: 200,
            message: "Login successful",
            payload: { user },
        });
    } catch (error) {
        next(error);
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

export { handleLogin, handleLogOut };

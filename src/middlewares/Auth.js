import createError from "http-errors";
import jwt from "jsonwebtoken";
import { jwt_Access_Key } from "../serect.js";

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw createError(
                401,
                "Unauthorized Access! Please login to continue."
            );
        }
        const decudeToken = jwt.verify(token, jwt_Access_Key);
        if (!decudeToken) {
            throw createError(
                401,
                "Unauthorized Access! Please login to continue."
            );
        }
        req.userId = decudeToken.userId;
        next();
    } catch (error) {
        return next(error);
    }
};

const isLoggedOut = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (token) throw createError(401, "user already exist");
        next();
    } catch (error) {
        next(error);
    }
};

export { isLoggedIn, isLoggedOut };

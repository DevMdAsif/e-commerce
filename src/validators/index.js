import { validationResult } from "express-validator";
import { errorResponse } from "../controllers/responseController.js";

const runValidataon = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, {
            statusCode: 400,
            message: errors.array()[0].msg,
        });
    }
    next();
};

export default runValidataon;

import createError from "http-errors";
import User from "../models/userModel.js";
import mongoose from "mongoose";

const findWithId = async (id, options) => {
    try {
        const item = await User.findById(id, options);

        if (!item) throw createError(404, "item not found");
        return item;
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, "Invalid item id");
        }
        throw error;
    }
};

export { findWithId };

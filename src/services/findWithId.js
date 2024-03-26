import createError from "http-errors";
import User from "../models/userModel.js";
import mongoose from "mongoose";

const findWithId = async (model, id, options = {}) => {
    try {
        const item = await model.findById(id, options);

        if (!item) throw createError(404, `${model.modelName} not found`);
        return item;
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, `Invalid ${model.modelName} id`);
        }
        throw error;
    }
};

export { findWithId };

import Category from "../models/categoryModel.js";
import { successResponse } from "./responseController.js";
import slugify from "slugify";

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        await Category.create({
            name: name,
            slug: slugify(name),
        });

        return successResponse(res, {
            success: true,
            message: "Category created successfully",
        });
    } catch (error) {
        return next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();

        return successResponse(res, {
            statusCode: 200,
            success: true,
            payload: categories,
        });
    } catch (error) {
        return next(error);
    }
};

export { createCategory, getCategories };

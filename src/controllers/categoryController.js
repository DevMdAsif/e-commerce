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
        const category = await Category.find({}).select("name slug");
        if (!category) {
            return next({
                message: "Categories not found",
                statusCode: 404,
            });
        }

        return successResponse(res, {
            statusCode: 200,
            success: true,
            payload: categories,
        });
    } catch (error) {
        return next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const slug = req.params.slug;

        const updatedCategory = await Category.findOneAndUpdate(
            { slug },
            {
                name: name,
                slug: slugify(name),
            },
            { new: true }
        ).select("name slug");

        if (!updatedCategory) {
            return next({
                message: "Category not found",
                statusCode: 404,
            });
        }

        return successResponse(res, {
            success: true,
            message: "Category updated successfully",
            payload: updatedCategory,
        });
    } catch (error) {
        return next(error);
    }
};

export { createCategory, getCategories, updateCategory };

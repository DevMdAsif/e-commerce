import { data, products } from "../data.js";
import User from "../models/userModel.js";
import productModel from "../models/productModel.js";
import { successResponse } from "./responseController.js";
import Product from "../models/productModel.js";

const seedUser = async (req, res, next) => {
    try {
        await User.deleteMany({});

        const users = await User.insertMany(data);

        res.status(201).json({
            success: true,
            message: "Users seeded successfully",
            plyload: users,
        });
    } catch (error) {
        next(error);
    }
};

const seedProduct = async (req, res, next) => {
    try {
        console.log(products);
        await Product.deleteMany({});

        console.log(products);

        const addProduct = await Product.insertMany(products);

        return successResponse(res, {
            statusCode: 201,
            message: "Products seeded successfully",
            payload: addProduct,
        });
    } catch (error) {
        next(error);
    }
};

export { seedUser, seedProduct };

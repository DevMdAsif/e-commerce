import Product from "../models/productModel.js";
import { successResponse } from "./responseController.js";

const createProduct = async (req, res, next) => {
    try {
        const product = req.body;

        const createProduct = await Product.create(product);

        return successResponse(res, {
            statusCode: 201,
            message: "Product created successfully",
            payload: createProduct,
        });
    } catch (error) {
        return next(error);
    }
};

export { createProduct };

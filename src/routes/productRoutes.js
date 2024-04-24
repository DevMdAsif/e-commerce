import express from "express";
import { createProduct } from "../controllers/productController.js";
import { uploadProductImage } from "../middlewares/uploadfile.js";
const productRouter = express.Router();

// product route = /api/products

productRouter.post("/", uploadProductImage.single("image"), createProduct);

export default productRouter;

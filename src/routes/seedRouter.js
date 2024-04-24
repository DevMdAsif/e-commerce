import express from "express";
import { seedProduct, seedUser } from "../controllers/seedController.js";
import { uploadProductImage } from "../middlewares/uploadfile.js";
const seedRouter = express.Router();

// seed route = /api/seed

seedRouter.get("/users", seedUser);

seedRouter.get("/products", uploadProductImage.single("image"), seedProduct);

export default seedRouter;

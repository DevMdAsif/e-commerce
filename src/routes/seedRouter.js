import express from "express";
import { seedProduct, seedUser } from "../controllers/seedController.js";
import upload from "../middlewares/uploadfile.js";
const seedRouter = express.Router();

// seed route = /api/seed

seedRouter.get("/users", seedUser);

seedRouter.get("/products", upload.array("image"), seedProduct);

export default seedRouter;

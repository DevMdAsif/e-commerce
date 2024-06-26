import express from "express";
import {
    createCategory,
    deletCategory,
    getCategories,
    updateCategory,
} from "../controllers/categoryController.js";
import runValidataon from "../validators/index.js";
import { isAdmin, isLoggedIn } from "../middlewares/Auth.js";
import { validateCategory } from "../validators/category.js";

const categoryRouter = express.Router();

//category routes= /api/categorys

categoryRouter.post(
    "/",
    isLoggedIn,
    isAdmin,
    validateCategory,
    runValidataon,
    createCategory
);
categoryRouter.get("/", getCategories);
categoryRouter.put(
    "/:slug",
    isLoggedIn,
    isAdmin,
    validateCategory,
    runValidataon,
    updateCategory
);

categoryRouter.delete("/:slug", isLoggedIn, isAdmin, deletCategory);

export default categoryRouter;

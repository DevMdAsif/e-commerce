import express from "express";
const userRouter = express.Router();
import { getUser } from "../controllers/userController.js";

userRouter.get("/", getUser);

export default userRouter;

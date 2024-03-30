import express from "express";
import upload from "../middlewares/uploadfile.js";
import {
    activateAccount,
    deleteUser,
    getUser,
    getUsers,
    processRegister,
} from "../controllers/userController.js";
const userRouter = express.Router();

// user routes : /api/users

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/process-register", upload.single("image"), processRegister);
userRouter.post("/verify", activateAccount);

export default userRouter;

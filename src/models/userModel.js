import { Schema, model } from "mongoose";
import { hashSync, compareSync } from "bcrypt";
import { defaultImage } from "../serect.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlangth: [3, "Name must be at least 3 characters"],
            maxlength: [20, "Name must be at most 20 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid e-mail address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            match: [
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
            ],
            Set: (value) => hashSync(value, 30),
        },
        image: {
            type: String,
            default: defaultImage,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const user = model("user", userSchema);

export default user;

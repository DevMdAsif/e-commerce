import { Schema, model } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";
import { defaultImage } from "../serect.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [20, "Name must be at most 20 characters"],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
            required: [true, "Email required"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            set: (value) => hashSync(value, genSaltSync(10)),
        },
        image: {
            type: String,
            default: defaultImage,
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
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

const User = new model("User", userSchema);

export default User;

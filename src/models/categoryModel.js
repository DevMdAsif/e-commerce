import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: [true, "Name must be unique"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
        },
        slug: {
            type: String,
            lowercase: true,
            required: [true, "Slug is required"],
            unique: [true, "Slug must be unique"],
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;

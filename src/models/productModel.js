import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        minLength: [3, "Product name must be at least 3 characters"],
        maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    slug: {
        type: String,
        required: [true, "Please enter product slug"],
        unique: true,
        lowercase: true,
        index: true,
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        match: [/^\d+(\.\d{1,2})?$/, "Please enter valid price"],
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
        minLength: [3, "Product description must be at least 3 characters"],
        maxLength: [200, "Product description cannot exceed 200 characters"],
    },
    quantity: {
        type: Number,
        required: [true, "Please enter product quantity"],
        validate: {
            validator: (v) => v > 0,
            message: "Quantity must be greater than 0",
        },
    },
    sold: {
        type: Number,
        default: 0,
        validate: {
            validator: (v) => v >= 0,
            message: "Sold quantity cannot be negative",
        },
    },
    image: {
        type: String,
        required: [true, "Please enter product image"],
    },
    shipping: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please select category for this product"],
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

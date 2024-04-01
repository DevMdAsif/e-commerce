import { body } from "express-validator";

const validateUserRegistration = [
    body("name", "Name is required")
        .notEmpty()
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Name must be at least 3 characters and at most 20 characters"
        ),
    body("email", "Email is required")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Email is invalid"),
    body("password", "Password is required")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("address", "Address is required")
        .notEmpty()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Address must be at least 3 characters"),
    body("phone", "Phone is required").notEmpty().trim(),
    body("image").optional().isString().withMessage("Image must be a string"),
];

export default validateUserRegistration;

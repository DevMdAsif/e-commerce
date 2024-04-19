import { body } from "express-validator";

const validateCategory = [
    body("name", "Name is required")
        .notEmpty()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
];

export { validateCategory };

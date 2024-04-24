import multer from "multer";
import path from "path";
import {
    UPLOAD_PATH,
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZE,
    UPLOAD_PRODUCT_IMAGE_PATH,
} from "../config/config.js";

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(
            null,
            Date.now() + "-" + file.originalname.replace(extname, " ") + extname
        );
    },
});

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PRODUCT_IMAGE_PATH);
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(
            null,
            Date.now() + "-" + file.originalname.replace(extname, " ") + extname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const uploadUserImage = multer({
    storage: userStorage,
    fileFilter,
    limits: MAX_FILE_SIZE,
});

const uploadProductImage = multer({
    storage: productStorage,
    fileFilter,
    limits: MAX_FILE_SIZE,
});

export { uploadUserImage, uploadProductImage };

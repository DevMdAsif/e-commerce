import multer from "multer";
import path from "path";
import {
    UPLOAD_PATH,
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZE,
} from "../config/config.js";

const storage = multer.diskStorage({
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

const fileFilter = (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({ storage: storage, fileFilter, limits: MAX_FILE_SIZE });

export default upload;

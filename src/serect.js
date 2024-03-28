const port = process.env.SERVER_PORT;

const defaultImage = "public/images/users/profileImg.jpg";

// connect to MongoDB

const MONGODB_URL =
    process.env.MONGODBATLAS_URL || "mongodb://localhost:27017/e-commerce";

const jwt_Activation_Key = process.env.jwt_Activation_Key;

const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

const clientUrl = process.env.CLIENT_URL || "";

export {
    port,
    MONGODB_URL,
    defaultImage,
    jwt_Activation_Key,
    smtpUsername,
    smtpPassword,
    clientUrl,
};

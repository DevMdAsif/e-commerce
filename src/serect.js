const port = process.env.SERVER_PORT;

// connect to MongoDB

const MONGODB_URL =
    process.env.MONGODBATLAS_URL || "mongodb://localhost:27017/e-commerce";

export { port, MONGODB_URL };

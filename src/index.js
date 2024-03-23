import app from "./app.js";

const port = process.env.SERVER_PORT;

// connect to MongoDB

const MONGODB_URI =
    process.env.MONGODBATLAS_URL || "mongodb://localhost:27017/e-commerce";

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

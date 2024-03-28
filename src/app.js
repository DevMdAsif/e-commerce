import express from "express";
import morgan from "morgan";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import userRouter from "./routes/userRouter.js";
import createError from "http-errors";
import seedRouter from "./routes/seedRouter.js";
import { errorResponse } from "./controllers/responseController.js";
import bodyParser from "body-parser";
import helmet from "helmet";

const app = express();

//middleware

// Rate limiter to prevent brute force attacks
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: "Too many requests from this IP, please try again after 1 minute",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

// client error handling middleware

app.use((req, res, next) => {
    next(createError(404, "Route Not Found"));
});

//all error handling middleware

app.use((err, req, res, next) => {
    return errorResponse(res, { statusCode: err.status, message: err.message });
});

export default app;

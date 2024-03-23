import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import xss from "xss";

const port = process.env.SERVER_PORT;
const app = express();

//middleware

// Rate limiter to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: "Too many requests from this IP, please try again after 1 minute",
});

// Sanitize request body to prevent XSS attacks
const sanitizeRequestBody = (req, res, next) => {
  if (req.body) {
    req.body = xss(req.body);
  }
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);
app.use(sanitizeRequestBody);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

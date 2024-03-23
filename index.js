import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const port = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

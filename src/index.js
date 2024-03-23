import app from "./app.js";
import connectDB from "./config/connectDB.js";
import { port } from "./serect.js";

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await connectDB();
});

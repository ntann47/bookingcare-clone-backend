import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }, { extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

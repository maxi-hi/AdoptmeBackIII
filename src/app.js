import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";

import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swaggerConfig.js";




const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`mongodb+srv://maximoperret:coderhouse@cluster0.rclpj.mongodb.net/BackendIII?retryWrites=true&w=majority&appName=Cluster0`);

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs",swaggerUiExpress.serve,swaggerUiExpress.setup(specs));






app.use("/api", router);
app.use(errorHandle);
app.listen(PORT, () => logger.info(`Listening on ${PORT}`));

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "video Notes AI API Running"
    });
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);
export default app;
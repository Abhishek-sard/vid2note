import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8081',
            'http://192.168.1.77:3000',
            'http://192.168.1.77:8081',
            'http://192.168.1.77:5000',
            'exp://192.168.1.77:8081',
            'exp://192.168.1.77:19000',
            'exp://192.168.1.77:19001',
            'exp://192.168.1.77:19002',
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
app.use("/api/video", videoRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
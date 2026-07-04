import express from 'express';

import {register, login, refreshToken, logout, getProfile} from "../controllers/authController.js";
import {registerValidation, loginValidation} from "../middlewares/validation.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    "/register", registerValidation,
    register,
);

router.post(
    "/login", loginValidation,
    login
);


router.post(
    "/logout", protect, logout
);

router.get(
    "/me",
    protect, 
    getProfile
);

export default router;



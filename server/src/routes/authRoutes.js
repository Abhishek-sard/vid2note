import express from 'express';

import {register, login, logout, getProfile
} from "../controllers/authController.js";
import {registerValidation, loginValidation} from "../validations/authValidation.js";
import protect from "../middleware/authMiddleware.js";

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



import {body} from "express-validator";


const registerValidation = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({min: 3})
    .withMessage("Name must be at least 3 characters"),
    body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),
    body("password")
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
    body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),
    body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export {registerValidation, loginValidation};
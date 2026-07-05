import {body} from "express-validator";

const youtubeValidation = [
    body("youtubeUrl")
    .notEmpty()
    .withMessage("YouTube URL is required")
    .isURL()
    .withMessage("Invalid URL"),
];

export default youtubeValidation;
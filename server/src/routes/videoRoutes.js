import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {youtubeValidation} from '../validations/videoValidator.js';
import {addYoutubeVideo} from '../controllers/videoController.js';

const router = express.Router();

router.post('/youtube', protect, youtubeValidation, addYoutubeVideo);

export default router;
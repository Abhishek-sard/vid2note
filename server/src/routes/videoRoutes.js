import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {youtubeValidation} from '../validations/videoValidator.js';
import {addYoutubeVideo, generateVideoNotes} from '../controllers/videoController.js';

const router = express.Router();

router.post('/youtube', protect, youtubeValidation, addYoutubeVideo);
router.post('/generate', protect, generateVideoNotes);

export default router;
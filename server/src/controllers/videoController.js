import Video from '../models/Video.js';
import {validationResult} from 'express-validator';
import {getVideoId} from "../services/youtubeService.js";
import {generateNotes} from "../services/geminiService.js";


const addYoutubeVideo = async (req, res) => {
    try {
        const errors = validationResult(req);


        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const {youtubeUrl} = req.body;

        const videoId = getVideoId(youtubeUrl);

        if(!videoId) {
            return res.status(400).json({
                success: false,
                message: "Invalid YouTube URL",
            });
        }

        const existing = await Video.findOne({videoId});

        if(existing){
            return res.status(400).json({
                success: false,
                message: "Video already exists",
            });
        }

        const video = await Video.create({
            youtubeUrl,
            videoId,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            video,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
};

const generateVideoNotes = async (req, res) => {
    try{
        const {title, transcript} = req.body;
        const notes = await generateNotes(transcript);

        const video = await Video.create({
            title,
            transcript,
            summary: notes.summary,
            keyPoints: notes.keyPoints,
            flashcards: notes.flashcards,
            mcqs: notes.mcqs,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            video,
            notes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export  {addYoutubeVideo, generateVideoNotes};
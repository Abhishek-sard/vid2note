import Video from '../models/Video.js';
import {validationResult} from 'express-validator';
import {getVideoId} from "../services/youtubeService.js";
import {generateNotes} from "../services/geminiService.js";
import {getTranscript} from "../services/transcriptService.js";


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
            if (existing.createdBy?.toString() === req.user._id.toString()) {
                return res.status(200).json({
                    success: true,
                    video: existing,
                    existing: true,
                });
            }

            return res.status(409).json({
                success: false,
                message: "This video already exists in another account.",
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
        const {youtubeUrl, title} = req.body;
        
        if (!youtubeUrl) {
            return res.status(400).json({
                success: false,
                message: "YouTube URL is required",
            });
        }

        // Extract video ID from URL
        const videoId = getVideoId(youtubeUrl);
        if (!videoId) {
            return res.status(400).json({
                success: false,
                message: "Invalid YouTube URL",
            });
        }

        const existing = await Video.findOne({videoId});
        if (existing && existing.createdBy?.toString() !== req.user._id.toString()) {
            return res.status(409).json({
                success: false,
                message: "This video already exists in another account.",
            });
        }

        // Fetch transcript from YouTube
        const transcript = await getTranscript(videoId);
        if (!transcript) {
            return res.status(400).json({
                success: false,
                message: "Could not fetch transcript for this video",
            });
        }

        // Generate notes using Gemini
        const notes = await generateNotes(transcript);

        // Save to database
        const video = existing || new Video({
            title: title || "YouTube Video",
            youtubeUrl,
            videoId,
            createdBy: req.user._id,
        });

        video.title = title || video.title || "YouTube Video";
        video.transcript = transcript;
        video.summary = notes.summary;
        video.keyPoints = notes.keyPoints;
        video.flashcards = notes.flashcards;
        video.mcqs = notes.mcqs;
        await video.save();

        res.status(201).json({
            success: true,
            data: {
                title: video.title,
                summary: notes.summary,
                keyPoints: notes.keyPoints,
                flashcards: notes.flashcards,
                mcqs: notes.mcqs,
            },
            video,
            notes,
        });
    } catch (error) {
        console.error("Generate notes error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export  {addYoutubeVideo, generateVideoNotes};
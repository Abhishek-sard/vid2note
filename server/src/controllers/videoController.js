import Video from '../models/Video.js';
import {validationResult} from 'express-validator';
import {getVideoId} from "../services/youtubeService.js";


const addYoutubeVideo = async (req, res) => {
    try {
        const errors = validatoinResult(req);


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

        const video = new Video.create({
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
export default {addYoutubeVideo};
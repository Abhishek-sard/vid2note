import mongoose from "mongoose";


const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
        },
        
        youtubeUrl: {
            type: String,
            required: true,
            unique: true,
        },
        

        videoId: {
            type: String,
            required: true,
            unique: true,
        },
        transcript: {
            type: String,
            default: "",
        },

        summary: {
            type: String,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        summary: {
            type: String,
            default: "",
        },
        keyPoints: [
            String
        ],
        flashcards: [
            {
                question: String,
                answer: String,
            }
        ],
        mcqs: [
            {
                question: String,
                options: [String],
                answer: String
            }
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Video", videoSchema);
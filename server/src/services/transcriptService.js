import { YoutubeTranscript } from "youtube-transcript";

const getTranscript = async (videoId) => {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        const fullTranscript = transcript.map(item => item.text).join(" ");
        return fullTranscript;
    } catch (error) {
        console.error("Transcript fetch error:", error);
        throw new Error("Could not fetch YouTube transcript: " + error.message);
    }
};

export { getTranscript };
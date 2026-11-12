
import api from "./api";

// Add YouTube video
const addYoutubeVideo = async (youtubeUrl: string) => {
  try {
    const response = await api.post("/video/youtube", {
      youtubeUrl: youtubeUrl.trim(),
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Add YouTube Video Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// Generate AI notes
const generateNotes = async (data: any) => {
  try {
    const response = await api.post("/video/generate", data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Generate Notes Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export {
  addYoutubeVideo,
  generateNotes,
};

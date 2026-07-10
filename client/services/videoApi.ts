import api from "./api";

//Add youtube video
const addYoutubeVideo = async (
    youtubeUrl: String
)=> {
    const response =
    await api.post(
        "/videos/youtube",
        {
            youtubeUrl
        }
    );
    return response.data;
};


//Generate AI Notes
const generateNotes = 
async(data:any) => {
    const response = 
    await api.post(
        "/videos/generate",
        data
    );

    return response.data;
}

export {
    addYoutubeVideo,
    generateNotes
}
import api from './api';

const uploadVideo = async(file:any) => {
    const formData = new FormData();

    formData.append(
        "video",
        {
            uri:file.uri,
            name:file.name,
            type:file.mimeType

        }as any
    );


    const response = await api.post(
        "/upload/video",
        formData,
        {
            headers:{
                "Content-Type":
                "multipart/form-data"
            }
        }
    );

    return response.data;
};

export {uploadVideo};
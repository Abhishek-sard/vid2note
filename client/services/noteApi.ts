import api from "./api";

//Get all notes
const getNotes = async() =>{
    const response = 
    await api.get(
        "/notes"
    );

    return response.data;
};

//Get Single note
const getNoteById = async(id:string) => {
    const response =
    await api.get(
        `/notes/${id}`
    );

    return response.data;
};

//Delete note
const deleteNote = async(id:string) => {
    const response =
    await api.delete(
        `/notes/${id}`
    );

    return response.data;
}

export {
    getNotes,
    getNoteById,
    deleteNote
};
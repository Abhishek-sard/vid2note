import api from './api';

//Register
const registerUser = async (data:any) => {
    const response = await api.post(
        "/auth/register",
        data
    );
    return response.data;
};

//login
const loginUser = async (data:any) => {
    const response = await api.post(
        "/auth/login",
        data
    );
    return response.data;
};


//logout
const logoutUser = async() => {
    const response =
    await api.post(
        "/auth/logout"
    );

    return response.data;
};

//current user
const getMe = async () => {
    const response = 
    await api.get(
        "/auth/me"
    );

    return response.data;
};

export {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}


import api from "./api";

const checkServerHealth = async () => {
    try {
        const response = await api.get("/");
        return response.data.success;
    } catch (error) {
        console.error("Server health check failed:", error);
        return false;
    }
};

export { checkServerHealth };

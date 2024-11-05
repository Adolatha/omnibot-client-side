import axios from "axios";

const API_URL = "https://api.omnibot.com"; // Base URL for server-side APIs

export default {
    async login(adriaId) {
        try {
            const response = await axios.post(`${API_URL}/login`, { adriaId });
            const token = response.data.token;
            localStorage.setItem("token", token);
            return token;
        } catch (error) {
            throw new Error("Failed to log in.");
        }
    },
    async register(adriaId) {
        try {
            const response = await axios.post(`${API_URL}/register`, { adriaId });
            return response.data;
        } catch (error) {
            throw new Error("Registration failed.");
        }
    },

};

import { apiBaseUrl } from '../assets/utils/config/config.js';

export default {
    async getBasketIds() {
        const response = await fetch(`${apiBaseUrl}baskets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch basket IDs.");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            return data;
        }

        throw new Error("Unexpected response format: basket IDs not found.");
    },
};


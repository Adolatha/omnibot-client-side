const API_URL = "https://project-2.ti.howest.be/monitor/apis/group-23";

export default {
    async getAllRobots() {
        const response = await fetch(`${API_URL}/robots`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch robots.");
        }
        return await response.json();
    },

    async createCustomRobot(robotId, features) {
        const response = await fetch(`${API_URL}/api/robots/custom`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ robotId, features }),
        });

        if (!response.ok) {
            throw new Error("Failed to create custom robot.");
        }
        return await response.json();
    },

    async retrieveRobotById(robotId, adrianId) {
        const response = await fetch(`${API_URL}/api/robots/retrieve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ robotId, adrianId }),
        });

        if (!response.ok) {
            throw new Error("Failed to retrieve robot.");
        }
        return await response.json();
    },

    async login(adriaId) {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adriaId }),
        });

        if (!response.ok) {
            throw new Error("Failed to log in.");
        }
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        return token;
    },

    async register(adriaId) {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adriaId }),
        });

        if (!response.ok) {
            throw new Error("Registration failed.");
        }
        return await response.json();
    },
};

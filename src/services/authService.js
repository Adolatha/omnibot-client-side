const API_URL = "https://project-2.ti.howest.be/monitor/apis/group-23";

export default {
    async getAllRobots() {
        try {
            const response = await fetch(`${API_URL}/api/robots`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch robots.");
            }
            return await response.json();
        } catch (error) {
            throw new Error(error.message || "Error fetching robots.");
        }
    },

    async createCustomRobot(robotId, features) {
        try {
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
        } catch (error) {
            throw new Error(error.message || "Error creating custom robot.");
        }
    },

    async retrieveRobotById(robotId, adrianId) {
        try {
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
        } catch (error) {
            throw new Error(error.message || "Error retrieving robot.");
        }
    },
    async login(adriaId) {
        try {
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify( { adriaId }),
            });

            if (!response.ok){
                throw new Error("Failed to log in");
            }
            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);
            return token;
        } catch (error) {
            throw new Error("Failed to log in.");
        }
    },
    async register(adriaId) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ adriaId }),
            });

            if(!response.ok) {
                throw new Error("Registration fialed.");
            }
            return await response.json();
        } catch (error) {
            throw new Error("Registration failed.");
        }
    },
};


const API_URL = "https://project-2.ti.howest.be/monitor/apis/group-23";
export default {
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

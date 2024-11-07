<template>
  <div class="outer-container">
    <div class="login-card">
      <h1>LOGIN</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="adriaId" type="text" placeholder="Enter your Adria ID" required />
        <button type="submit">Log In</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import authService from "@/services/authService.js";

export default {
  data() {
    return {
      adriaId: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      // Check if the entered ID is the temporary bypass ID
      if (this.adriaId === "123") {
        this.$router.push("/main"); // Redirect to /main directly
      } else {
        try {
          // Otherwise, proceed with the usual authentication
          await authService.login(this.adriaId);
          this.$router.push("/dashboard");
        } catch (err) {
          this.error = "Login failed. Please check your Adria ID and try again.";
        }
      }
    },
  },
};
</script>

<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}



button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>

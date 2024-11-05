<template>
  <div class="login-container">
    <h1>LOGIN</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="adriaId" type="text" placeholder="Enter your Adria ID" required/>
      <button type="submit"> Log In</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>

import authService from "@/services/authService.js";

export default {
  data() {
    console.log("data function called");
    return {
      adriaId: "",
      error: null,
    };
  },

  methods: {
    async handleLogin(){
      try{
        await authService.login(this.adriaId);
        this.$router.push("/dashboard");
      }catch (err){
        this.error = "Login failed. Please check your Adria ID and try again."
      }
    },
  },
};
</script>

<style scoped>

.login-container {
  max-width: 400px;
  margin: 50px auto;
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
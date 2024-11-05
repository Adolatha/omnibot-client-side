<template>
  <div class="welcome-container">
    <h1>Welcome to OMNIBOT</h1>
    <p>Your one-stop platform for renting robots tailored to your needs.</p>
    <button @click="goToLogin">Get Started</button>
  </div>
</template>

<script>
export default {
  name: "TheWelcome",
  methods: {
    goToLogin() {
      // Navigate to the login page
      this.$router.push("/Login");
    }
  }
};
</script>

<style scoped>
.welcome-container {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
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
</style>

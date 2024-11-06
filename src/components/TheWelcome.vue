<template>
  <div class="auth-container">
    <div class="auth-box">
      <!-- Left Section with Logo and Features -->
      <div class="left-section">
        <img src="/src/assets/images/OMNIBOT.png" alt="Omnibot Logo" class="logo">
        <ul class="features-list">
          <li>
            <span class="icon">🌿</span>
            <span>Sustainable Product</span>
          </li>
          <li>
            <span class="icon">🚚</span>
            <span>Fast Delivery</span>
          </li>
          <li>
            <span class="icon">💰</span>
            <span>Easy Refund and Return</span>
          </li>
          <li>
            <span class="icon">🔒</span>
            <span>Secure and Safe</span>
          </li>
        </ul>
      </div>

      <div class="right-section">
        <button class="login-button" @click=goToLogin>LOGIN</button>
      </div>
    </div>
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
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

</style>

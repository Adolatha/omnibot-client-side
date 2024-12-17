<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="left-section">
        <img src="/src/assets/images/OMNIBOT.png" alt="Omnibot Logo" class="start-logo">
        <ul class="features-list">
          <li>
            <img src="../assets/images/sustainable.png" alt="sustainable" class="icon">
            <span>Sustainable Product</span>
          </li>
          <hr class="feature-divider"/>
          <li>
            <img src="../assets/images/delivery.png" alt="Fast Delivery Icon" class="icon">
            <span>Fast Delivery</span>
          </li>
          <hr class="feature-divider"/>
          <li>
            <img src="../assets/images/refund.png" alt="Easy Refund and Return Icon" class="icon">
            <span>Easy Refund and Return</span>
          </li>
          <hr class="feature-divider"/>
          <li>
            <img src="../assets/images/secure.png" alt="Secure and Safe Icon" class="icon">
            <span>Secure and Safe</span>
          </li>
        </ul>
      </div>

      <div class="right-section">
        <button class="login-button" @click="goToLogin">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goToLogin() {
      this.$router.push("/main");
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0;
}


.auth-box {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 3rem;
  margin: 5rem;
}

.left-section, .right-section {
  padding: 40px;
}

.left-section {
  width: 60%;
  border-right: 1px dashed #ddd;
}

.right-section {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-logo {
  width: 90%;
  margin: 1rem 1rem 3rem 0;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  margin-top: 1rem;
  margin-bottom: 1rem;

}

.icon {
  font-size: 24px;
  color: #000;
  margin-right: 10px;
  width: 24px; height: 24px;
}

.feature-divider {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

button {
  margin-top: 20px;
  margin-left: 2rem;
  padding: 1.5rem 3rem;
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

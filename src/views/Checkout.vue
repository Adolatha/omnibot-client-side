<template>
  <div class="checkout-page">
    <h2>Your Cart</h2>

    <!-- Loading screen -->
    <div v-if="loading" class="loading-screen">
      <div class="loading-box">
        <p>Processing your payment...</p>
      </div>
    </div>

    <!-- Payment confirmation screen -->
    <div v-else-if="paymentConfirmed" class="confirmation-screen">
      <div class="confirmation-box">
        <p>Payment Successful!</p>
        <button class="continue-button" @click="goToMainScreen">Continue</button>
      </div>
    </div>

    <!-- Cart screen -->
    <div v-else>
      <div v-if="cart.length === 0" class="empty-cart-message">
        <p>Your cart is empty.</p>
        <router-link to="/products" class="go-back-button">Back to Products</router-link>
      </div>
      <div v-else>
        <div class="cart-items">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <img :src="`/2024-2025/group-23/images/${item.image}`" :alt="item.name" class="cart-item-image" />
            <div class="cart-item-details">
              <h3 class="cart-item-name">{{ item.name }}</h3>
              <p class="cart-item-price">{{ item.price }} ADCO/month</p>
            </div>
          </div>
        </div>
        <div class="total-price">
          <p>Total: {{ totalPrice }} ADCO/month</p>
        </div>
        <div class="cart-actions">
          <button class="go-back-button" @click="goBack">Back to Products</button>
          <button class="pay-button" @click="proceedToPayment">PAY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(this.$route.query.cart || "[]"), // Parse the cart data from the query
      loading: false,
      paymentConfirmed: false,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + Number(item.price), 0);
    },
  },
  methods: {
    goBack() {
      this.$router.push("/products");
    },
    proceedToPayment() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.paymentConfirmed = true;
      }, 2000); // 3-second loading period
    },
    goToMainScreen() {
      this.$router.push("/dashboard"); // Navigate to the main screen
    },
  },
};
</script>

<style scoped>
.checkout-page {
  text-align: center;
  padding: 20px;
}

.loading-screen,
.confirmation-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.loading-box,
.confirmation-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}

.cart-item {
  display: flex;
  align-items: center;
  width: 50%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 20px;
}

.cart-item-details {
  text-align: left;
}

.cart-item-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.cart-item-price {
  color: #666;
}

.total-price {
  font-size: 1.2em;
  font-weight: bold;
  margin: 20px 0;
}

.cart-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.go-back-button,
.pay-button,
.continue-button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.go-back-button {
  background-color: #007bff;
}

.pay-button {
  background-color: #28a745;
}

.continue-button {
  background-color: #007bff;
  margin-top: 2rem;
}

.go-back-button:hover {
  background-color: #0056b3;
}

.pay-button:hover {
  background-color: #218838;
}

.continue-button:hover {
  background-color: #0056b3;
}

.empty-cart-message {
  font-size: 1.2em;
  color: #555;
}
</style>

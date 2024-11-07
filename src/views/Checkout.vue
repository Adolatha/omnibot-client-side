<template>
  <div class="checkout-page">
    <h2>Your Cart</h2>
    <div v-if="cart.length === 0" class="empty-cart-message">
      <p>Your cart is empty.</p>
      <router-link to="/products" class="go-back-button">Back to Products</router-link>
    </div>
    <div v-else>
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="`/src/assets/images/${item.image}`" :alt="item.name" class="cart-item-image" />
          <div class="cart-item-details">
            <h3 class="cart-item-name">{{ item.name }}</h3>
            <p class="cart-item-price">{{ item.price }} ADCO/month</p>
          </div>
        </div>
      </div>
      <div class="cart-actions">
        <button class="button" @click="goBack">Back to Products</button>
        <button class="button" @click="proceedToPayment">Proceed to Payment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(this.$route.query.cart || "[]"), // Parse the cart data from the query
    };
  },
  methods: {
    goBack() {
      this.$router.push("/products"); // Navigate back to the products page
    },
    proceedToPayment() {
      alert("Proceeding to payment...");
    },
  },
};
</script>


<style scoped>
.checkout-page {
  text-align: center;
  padding: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
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

.cart-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.go-back-button,
.pay-button {
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

.go-back-button:hover {
  background-color: #0056b3;
}

.pay-button:hover {
  background-color: #218838;
}

.empty-cart-message {
  font-size: 1.2em;
  color: #555;
}
</style>

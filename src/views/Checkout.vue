<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <h2>Your Cart</h2>

      <div v-if="loading" class="loading-screen">
        <div class="loading-box">
          <p>Processing your payment...</p>
        </div>
      </div>

      <div v-else-if="paymentConfirmed" class="confirmation-screen">
        <div class="confirmation-box">
          <p>Payment Successful!</p>
          <button class="continue-button" @click="goToMainScreen">Continue</button>
        </div>
      </div>

      <div v-else>
        <div v-if="cart.length === 0" class="empty-cart-message">
          <p>Your cart is empty.</p>
          <router-link to="/products" class="go-back-button">Back to Products</router-link>
        </div>
        <div v-else>
          <div class="cart-items">
            <div
                v-for="item in cart"
                :key="item.id"
                :class="['cart-item', { 'removing-item': item.removing }]"
            >
              <img :src="`/images/${item.name}.png`" :alt="item.name" class="cart-item-image" />
              <div class="cart-item-details">
                <h3 class="cart-item-name">{{ item.name }}</h3>
                <p class="cart-item-price">{{ item.price }} ADCO/month</p>
              </div>
              <button class="remove-button" @click="removeFromCart(item)">Remove</button>
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
  </div>
</template>

<script>
import { post } from "../assets/utils/api/api-methods.js";

export default {
  data() {
    return {
      cart: [], // Stores renting_basket_robots
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
    async fetchCart() {
      const basketId = "0ec7c116-013e-44e7-b1b2-92678588e905"; // Replace with the actual basket ID
      const userId = "d918f1a7-27d8-4b97-866e-a944d9f680e1"; // Replace with the actual user ID
      try {
        const response = await post("basket/retrieve", {
          userId: userId,
          basketId: basketId,
        });
        console.log(response.robots);
        // Populate the cart array with the robots from the response
        if (response.robots && response.robots.length > 0) {
          this.cart = response.robots.map((robot) => ({
            id: robot.id,
            name: robot.name,
            price: robot.price,
            removing: false, // Add a default `removing` property for animation purposes
          }));
        } else {
          console.error("No robots found in the basket.");
          this.cart = [];
        }
      } catch (error) {
        console.error("Failed to retrieve robots from the basket:", error);
        this.cart = []; // Reset cart in case of an error
      }
    },

    goBack() {
      this.$router.push("/products");
    },
    proceedToPayment() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.paymentConfirmed = true;
      }, 2000);
    },
    goToMainScreen() {
      this.$router.push("/dashboard/watchmybot");
    },
    async removeFromCart(item) {
      const basketId = "0ec7c116-013e-44e7-b1b2-92678588e905"; // Replace with the actual basket ID
      item.removing = true; // Trigger animation for removal

      try {
        // Make API call to remove the robot from the basket
        await post("basket/remove-robot", {
          robotId: item.id, // Use the robot's ID
          basketId: basketId, // Use the predefined basket ID
        });

        // Remove the robot from the cart array after a successful response
        setTimeout(() => {
          const itemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id);
          if (itemIndex !== -1) {
            this.cart.splice(itemIndex, 1);
          }
        }, 300); // Match the animation duration
      } catch (error) {
        console.error("Failed to remove robot from the basket:", error);
        item.removing = false; // Reset animation state in case of error
      }
    }

  },
  async mounted() {
    await this.fetchCart(); // Fetch cart data on component mount
  },
};
</script>



<style scoped>
.checkout-page {
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.checkout-container {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 90%;
  max-width: 800px;
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
  justify-content: space-between;
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Animation for removing items */
.removing-item {
  opacity: 0;
  transform: translateX(-20px);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.cart-item-details {
  flex: 1;
  margin-left: 20px;
  text-align: left;
}

.cart-item-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.cart-item-price {
  color: #666;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: #c82333;
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

.go-back-button:hover {
  background-color: #0056b3;
}

.pay-button:hover {
  background-color: #218838;
}
</style>

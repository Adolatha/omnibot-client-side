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
                v-for="(item, index) in cart"
                :key="`${item.id}-${index}`"
                :class="['cart-item', { 'removing-item': item.removing }]"
            >
              <img :src="`/images/${item.name}.png`" :alt="item.name" class="cart-item-image" />
              <div class="cart-item-details">
                <h3 class="cart-item-name">{{ item.name }}</h3>
                <p class="cart-item-price">{{ item.price }} ADCO/month</p>
              </div>
              <button class="remove-button" @click="removeFromCart(item, index)">Remove</button>
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
import basketService from '../services/basketService.js';

export default {
  data() {
    return {
      cart: [], // Stores renting_basket_robots
      loading: false,
      paymentConfirmed: false,
      basketId: null, // Dynamic basket ID
      userId: "21810db9-0040-4670-8d19-8d3d070c136a", // Replace with the actual user ID
      timeout: 2000,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + Number(item.price), 0);
    },
  },
  methods: {
    // Fetch the latest basketId dynamically
    async fetchBasketId() {
      try {
        const basketIds = await basketService.getBasketIds();
        this.basketId = basketIds[basketIds.length - 1]; // Use the last basket ID
        console.log("Dynamic basketId:", this.basketId);
      } catch (error) {
        console.error("Failed to fetch basket IDs:", error);
      }
    },

    async fetchCart() {
      if (!this.basketId) {
        console.error("Basket ID not set.");
        return;
      }
      try {
        const response = await post("basket/retrieve", {
          userId: this.userId,
          basketId: this.basketId,
        });
        console.log(response.robots);

        if (response.robots && response.robots.length > 0) {
          this.cart = response.robots.map((robot) => ({
            id: robot.id,
            name: robot.name,
            price: robot.price,
            removing: false,
          }));
        }
      } catch (error) {
        console.error("Failed to retrieve robots from the basket:", error);
        this.cart = [];
      }
    },

    goBack() {
      this.$router.push("/products");
    },

    proceedToPayment() {
      if (!this.basketId) {
        console.error("Basket ID not set.");
        return;
      }

      this.loading = true;

      post("basket/finalize", { basketId: this.basketId })
          .then(() => {
            setTimeout(() => {
              this.loading = false;
              this.paymentConfirmed = true;
            }, timeout);
          })
          .catch((error) => {
            console.error("Failed to finalize the basket:", error);
            this.loading = false;
            alert("Payment failed. Please try again.");
          });
    },

    goToMainScreen() {
      this.$router.push("/dashboard/watchmybot");
    },

    async removeFromCart(item, index) {
      if (!this.basketId) {
        console.error("Basket ID not set.");
        return;
      }

      item.removing = true;

      try {
        await post("basket/remove-robot", {
          robotId: item.id,
          basketId: this.basketId,
        });

        setTimeout(() => {
          this.cart.splice(index, 1);
        }, );
      } catch (error) {
        console.error("Failed to remove robot from the basket:", error);
        item.removing = false;
      }
    },
  },

  async mounted() {
    await this.fetchBasketId(); // Fetch dynamic basket ID first
    if (this.basketId) {
      await this.fetchCart(); // Fetch cart only if basketId is retrieved
    }
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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

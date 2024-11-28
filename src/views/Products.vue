<template>
  <header class="header">
    <img src="@/assets/images/OMNIBOT.png" alt="logo" class="logo" />
    <nav class="nav">
      <router-link
          to="/dashboard"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/dashboard' }"
      >Dashboard</router-link>
      <router-link
          to="/main"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/main' }"
      >Home</router-link>
      <router-link
          to="/about"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/about' }"
      >About us</router-link>
      <router-link
          to="/products"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/products' }"
      >Products</router-link>
      <router-link
          to="/contact"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/contact' }"
      >Contact us</router-link>

      <!-- Cart Icon with Counter -->
      <div class="cart-icon-container">
        <router-link
            :to="{ path: '/checkout', query: { cart: JSON.stringify(cart) } }"
        >
          <img
              src="@/assets/images/shopping-cart.png"
              alt="Shopping Cart"
              class="cart-icon"
          />
        </router-link>
        <span v-if="cart.length" class="cart-counter">{{ cart.length }}</span>
      </div>
    </nav>
  </header>

  <!-- Toast Notification -->
  <div v-if="showToast" class="toast-notification">
    <p>{{ lastAddedProduct.name }} has been added to the cart!</p>
  </div>

  <!-- Content Section -->
  <div class="content-container">
    <div class="products-page">
      <h2 class="page-title">Discover Our Bots</h2>
      <p class="subtitle">The future of assistance, learning, and innovation.</p>
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a bot..."
          class="search-bar"
      />
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else class="product-list">
        <div
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            class="product-card"
        >
          <img
              :src="`/images/${product.name}.png`"
              :alt="`${product.name} Image`"
              class="product-image"
          />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }} ADCO/month</p>
          <div class="button-group">
            <!-- Check if this is the last product -->
            <template v-if="index === filteredProducts.length - 1">
              <!-- Customize Button -->
              <button class="info-button" @click="customizeProduct(product)">
                Customize
              </button>
            </template>
            <template v-else>
              <!-- More Info and Add to Cart Buttons -->
              <button class="info-button" @click="showMoreInfo(product)">More info</button>
              <button class="cart-button" @click="addToCart(product)">Add to cart</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2 class="modal-text-header">{{ selectedProduct.name }}</h2>
      <p class="modal-text"><em>Price:</em> {{ selectedProduct.price }} ADCO/month</p>
      <p class="modal-text"><em>Renting Period Until:</em> {{ selectedProduct.rentingPeriod }}</p>

      <!-- Features List -->
      <h3 class="features-title">Features:</h3>
      <ul class="features-list" v-if="selectedProduct.features && selectedProduct.features.length">
        <li v-for="(feature, index) in selectedProduct.features" :key="index">{{ feature }}
        </li>
      </ul>
      <p v-else>No features available.</p>
    </div>
  </div>
</template>


<script>
import { get, post } from "../assets/utils/api/api-methods.js";

export default {
  data() {
    return {
      products: [],
      searchQuery: "",
      showModal: false,
      selectedProduct: null,
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      showToast: false,
      lastAddedProduct: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await get("/robots");
        this.products = response.robots;
      } catch (error) {
        this.error = "Failed to load products. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async addToCart(product) {
      const basketId = "4fc4df27-74c5-4264-bd72-5ab42f73a028"; // Example UUID; replace with a real one.
      console.log(product);
      try {
        console.log("Attempting to add product with payload:", {
          robotId: product.id,
          basketId: basketId,
        });

        const response = await post("basket/add-robot", {
          robotId: product.id, // Assuming product.id is a UUID or formatted like one.
          basketId: basketId,
        });

        console.log("API Response:", response);
        this.cart = response.data.robots || [];
        this.lastAddedProduct = product;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      } catch (error) {
        console.error("Failed to add robot to cart:", error);
      }
    },

    showMoreInfo(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
    },

    customizeProduct(product) {
      this.$router.push({ name: 'Customize', params: { id: product.id } });
    },
  },

  mounted() {
    this.fetchProducts();
  },
};
</script>



<style scoped>
/* Main content container for the white rounded box */
.content-container {
  margin: 20px auto;
  max-width: 1400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.products-page {
  padding: 2rem;
  text-align: center;
}

.search-bar {
  padding: 12px 20px;
  width: 80%;
  max-width: 450px;
  border: 1px solid #ddd;
  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  outline: none;
  margin: 0 auto 1rem;
}

.search-bar:focus {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  border-color: #6a11cb;
}

.search-bar::placeholder {
  color: #aaa;
  font-style: italic;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 1.5rem;
  background-color: #d4e4ff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 330px;
  margin-bottom: 20px;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 12px;
}

.product-name {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
}

.product-price {
  color: #666;
  margin-bottom: 8px;
  font-weight: bold;
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  gap: 8px;
}

.info-button,
.cart-button {
  flex: 1;
  background-color: blue;
  color: #fff;
  border: none;
  padding: 12px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.info-button:hover,
.cart-button:hover {
  background-color: cornflowerblue;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 30px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

em{
  font-size: 1.3rem;
  font-weight: bold;
}

.modal-text-header{
  font-size: 2rem;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
}

.features-title {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.features-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.features-list li {
  font-size: 1.1rem;
  color: #555;
  margin: 0.5rem 0;
  text-align: left;
  padding-left: 1.5rem;
  position: relative;
}

.features-list li i {
  color: #4caf50;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}
.modal-text{
  font-size: 1.3rem;
}

.modal-content ul {
  list-style-type: disc;
  margin: 16px 0;
  padding-left: 20px;
}

.modal-content li {
  margin: 8px 0;
  font-size: 16px;
  color: #333;
}

/* Cart Icon and Counter */
.cart-icon-container {
  position: absolute;
  right: 30px;
  padding-top: 0.5rem;
}

.cart-icon {
  width: 28px;
  height: 28px;
}

.cart-counter {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
  font-weight: bold;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  top: 86px;
  right: 20px;
  background-color: #4caf50;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fade-in 0.5s ease-in-out, fade-out 0.5s ease-in-out 3s;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>

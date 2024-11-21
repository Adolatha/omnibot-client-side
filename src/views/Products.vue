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
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="`/images/${product.name}.png`" :alt="`${product.name} Image`" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }} ADCO/month</p>
          <div class="button-group">
            <button class="info-button" @click="showMoreInfo(product)">More info</button>
            <button class="cart-button" @click="addToCart(product)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2>{{ selectedProduct.name }}</h2>
      <img :src="`/images/${selectedProduct.name}.png`" :alt="`${selectedProduct.name} Image`" class="modal-product-image" />
      <p>{{ selectedProduct.moreInfo }}</p>
      <p>Price: {{ selectedProduct.price }} ADCO/month</p>
    </div>
  </div>
</template>

<script>
import { get } from "../assets/utils/api/api-methods.js";

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
    addToCart(product) {
      this.cart.push(product);
      this.lastAddedProduct = product;
      localStorage.setItem("cart", JSON.stringify(this.cart));

      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    showMoreInfo(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
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

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 12px;
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

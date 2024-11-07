<template>
  <header class="header">
    <img src="@/assets/images/OMNIBOT.png" alt="logo" class="logo" />
    <nav class="nav">
      <router-link to="/main" class="nav-item">Home</router-link>
      <router-link to="/products" class="nav-item">About us</router-link>
      <router-link to="/products" class="nav-item">Services</router-link>
      <router-link to="/products" class="nav-item">Products</router-link>
      <router-link to="/products" class="nav-item">Contact us</router-link>
      <button class="get-started-button">GET STARTED</button>
    </nav>
  </header>
  <div class="products-page">
    <h2>OUR BOTS</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else class="product-list">
      <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
      >

        <img :src="`/2024-2025/group-23/src/assets/images/${product.image}`" :alt="`${product.name}`" class="product-image" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }} ADCO</p>
        <div class="button-group">
          <button class="info-button" @click="showMoreInfo(product)">More info</button>
          <button class="cart-button" @click="addToCart(product)">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://your-server-url/products');
        this.products = response.data;
      } catch (error) {
        this.error = 'Failed to load products. Please try again later.';
      } finally {
        this.loading = false;
      }
    },*/
export default {
  data() {
    return {
      products: [
        { id: 1, name: "Basic Bot", price: "50", image: 'basicpack.png' },
        { id: 2, name: "Basic+ Bot", price: "80", image: "basicplus.png" },
        { id: 3, name: "Study Bot", price: "100", image: "study.png" },
        { id: 4, name: "Premium Bot", price: "150", image: "premium.png" },
        { id: 5, name: "Vibranium Bot", price: "200", image: "ultra.png" },
        { id: 6, name: "Custom Bot", price: "300", image: "custom.png" },
      ],
    };
  },
  methods: {
    showMoreInfo(product) {
      alert(`More info about ${product.name}`);
    },
    addToCart(product) {
      alert(`${product.name} added to cart!`);
    },
  },
};
</script>

<style scoped>
.products-page {
  text-align: center;
  padding: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: 220px;
  border-radius: 4px;
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
  margin-bottom: 12px;
}

.button-group {
  display: flex;
  gap: 8px;
}

.info-button,
.cart-button {
  background-color: blue;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.info-button:hover,
.cart-button:hover {
  background-color: cornflowerblue;
}
</style>

<template>
  <header class="header">
    <router-link to="/main">
      <img src="@/assets/images/OMNIBOT.png" alt="logo" class="logo" />
    </router-link>    <nav class="nav">
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
            :to="{ path: '/checkout'}"
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
    <p>Product has been added to the cart!</p>
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
              :src="`/2024-2025/group-23/images/${product.name}.png`"
              :alt="`${product.name}`"
              class="product-image"
          />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }} ADCO/month</p>
          <div class="button-group">
            <!-- Check if this is the last product -->
            <template v-if="index === filteredProducts.length - 1">
              <!-- Customize Button -->
              <button
                  class="info-button"
                  @click="openCustomizeModal(product.id)"
              >
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
  <!-- Customize Modal -->
  <div v-if="showCustomizeModal" class="modal-overlay" @click.self="closeCustomizeModal">
    <div class="modal-content">
      <h2>Customize Your Bot</h2>
      <p>Select the packages you want to include:</p>
      <div class="packages-list">
        <div
            v-for="(packageItem, index) in availablePackages"
            :key="index"
            class="package-item-vertical"
        >
          <input
              type="checkbox"
              :id="`package-${index}`"
              :value="packageItem.name"
              @change="togglePackageSelection(packageItem.name, $event)"
          />
          <label :for="`package-${index}`">
            {{ packageItem.name }} - {{ packageItem.price }} ADCO
          </label>
        </div>
      </div>
      <div class="button-group">
        <button class="cart-button" @click="saveCustomization">Add to cart</button>
        <button class="info-button" @click="closeCustomizeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>


<script>
import { get, post } from "../assets/utils/api/api-methods.js";
import basketService from '../services/basketService.js';

export default {
  data() {
    return {
      products: [],
      searchQuery: "",
      showModal: false,
      showCustomizeModal: false,
      selectedProduct: null,
      cart: [],
      showToast: false,
      loading: false,
      error: null,
      availablePackages: [
        { name: "CONVERSATIONAL", price: 75 },
        { name: "BUTLER", price: 200 },
        { name: "TUTORING", price: 100 },
        { name: "HEALTH", price: 150 },
        { name: "SECURITY", price: 250 },
        { name: "INDUSTRIAL", price: 200 },
        { name: "ENTERTAINMENT", price: 100 },
        { name: "PROFESSIONAL_EXPERTISE", price: 350 },
      ],
      selectedPackages: [],
      selectedRobotId: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {async fetchProducts() {
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
    }, async addToCart(productOrId) {
      try {
        let robotId;
        if (typeof productOrId === "object" && productOrId.id) {
          robotId = productOrId.id;
          this.cart.push(productOrId);
        } else if (typeof productOrId === "string") {
          robotId = productOrId;
        } else throw new Error("Invalid input to addToCart.");
        const basketIds = await basketService.getBasketIds();
        const basketId = basketIds[basketIds.length-1];
        await post("basket/add-robot", { robotId, basketId });

        const TOAST_DURATION_MS = 3000;
        this.showToast = true;
        setTimeout(() => (this.showToast = false), TOAST_DURATION_MS);
      } catch (error) {
        console.error("Failed to add robot to cart:", error);
        alert("Failed to add robot to cart. Please try again.");
      }
    }, showMoreInfo(product) {
      this.selectedProduct = product;
      this.showModal = true;
    }, closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
    }, openCustomizeModal(robotId) {
      console.log("Selected Robot ID:", robotId);
      this.selectedRobotId = robotId;
      this.showCustomizeModal = true;
    }, closeCustomizeModal() {
      this.showCustomizeModal = false;
      this.selectedPackages = [];
    }, togglePackageSelection(packageName, event) {
      if (event.target.checked) {
        this.selectedPackages.push(packageName);
      } else {
        this.selectedPackages = this.selectedPackages.filter(
            (name) => name !== packageName
        );
      }
    }, async saveCustomization() {
      if (this.selectedPackages.length === 0) {
        alert("Please select at least one package.");
        return;
      }

      try {
        await post("/robots/custom", {
          robotId: this.selectedRobotId,
          features: this.selectedPackages,
        });

        await this.addToCart(this.selectedRobotId);

        this.closeCustomizeModal();
      } catch (error) {
        console.error("Failed to save customization:", error);
        alert("Failed to save customization. Please try again.");
      }
    },},

  mounted() {
    this.fetchProducts();
  },
};
</script>



<style scoped>
.content-container {
  margin: 20px auto;
  max-width: 1400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.products-page {
  padding: 2rem;
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  font-style: italic;
}

/* Search bar styling */
.search-bar {
  padding: 12px 20px;
  width: 80%;
  max-width: 450px;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  outline: none;
  margin: 0 auto 2rem;
}

.search-bar:focus {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  border-color: #6a11cb;
}

.search-bar::placeholder {
  color: #aaa;
  font-style: italic;
}

/* Product grid */
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Product card styling */
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 1.5rem;
  background: #ffffff;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.1), -6px -6px 10px #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 330px;
  margin-bottom: 20px;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-name {
  font-weight: bold;
  font-size: 1.4em;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
  text-transform: capitalize;
}

.product-price {
  color: #3339;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.1em;
}

/* Buttons */
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
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background 0.3s ease;
}

.info-button:hover,
.cart-button:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  transform: scale(1.05);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.8rem;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #6a11cb;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
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

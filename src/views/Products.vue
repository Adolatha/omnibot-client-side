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
        { name: "ARMY_SUPPORT", price: 500 },
      ],
      selectedPackages: [],
      selectedRobotId: null, // Stores the custom robot ID
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
    async addToCart(productOrId) {
      try {
        let robotId;

        if (typeof productOrId === "object" && productOrId.id) {
          robotId = productOrId.id; // Extract ID from product object
          this.cart.push(productOrId); // Add the product to the cart array
        } else if (typeof productOrId === "string") {
          robotId = productOrId; // Use the ID directly
        } else {
          throw new Error("Invalid input to addToCart.");
        }
        const basketIds = await basketService.getBasketIds();
        const basketId = basketIds[basketIds.length-1];
        // Post the robotId and basketId to the server
        await post("basket/add-robot", {
          robotId: robotId,
          basketId: basketId,
        });


        const TOAST_DURATION_MS = 3000;

        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, TOAST_DURATION_MS);
      } catch (error) {
        console.error("Failed to add robot to cart:", error);
        alert("Failed to add robot to cart. Please try again.");
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
    openCustomizeModal(robotId) {
      console.log("Selected Robot ID:", robotId); // Debugging
      this.selectedRobotId = robotId; // Store the robot ID
      this.showCustomizeModal = true;
    },

    closeCustomizeModal() {
      this.showCustomizeModal = false;
      this.selectedPackages = [];
    },
    togglePackageSelection(packageName, event) {
      if (event.target.checked) {
        this.selectedPackages.push(packageName);
      } else {
        this.selectedPackages = this.selectedPackages.filter(
            (name) => name !== packageName
        );
      }
    },

    async saveCustomization() {
      if (this.selectedPackages.length === 0) {
        alert("Please select at least one package.");
        return;
      }

      try {
        // Send customization to the server
        await post("/robots/custom", {
          robotId: this.selectedRobotId, // Use the selected robot ID
          features: this.selectedPackages, // Selected features
        });

        // Add the customized robot to the cart
        await this.addToCart(this.selectedRobotId); // Pass the ID directly

        // Close the modal and reset selected packages
        this.closeCustomizeModal();
      } catch (error) {
        console.error("Failed to save customization:", error);
        alert("Failed to save customization. Please try again.");
      }
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

.packages-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 7rem;
  gap: 10px;
}

.package-item-vertical {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="checkbox"] {
  margin: 0;
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

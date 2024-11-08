<template>
  <header class="header">
    <img src="@/assets/images/OMNIBOT.png" alt="logo" class="logo" />
    <nav class="nav">
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
        <router-link :to="{ path: '/checkout', query: { cart: JSON.stringify(cart) } }">
          <img src="@/assets/images/shopping-cart.png" alt="Shopping Cart" class="cart-icon" />
        </router-link>
        <span v-if="cart.length" class="cart-counter">{{ cart.length }}</span>
      </div>
    </nav>
  </header>

  <div class="products-page">
    <h2>OUR BOTS</h2>
    <input type="text" v-model="searchQuery" placeholder="Search products..." class="search-bar" />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="`2024-2025/group-23/images/${product.image}`" :alt="`${product.name} Image`" class="product-image" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }} ADCO/month</p>
        <p class="product-description">{{ product.description }}</p>
        <div class="button-group">
          <button class="info-button" @click="showMoreInfo(product)">More info</button>
          <button class="cart-button" @click="addToCart(product)">Add to cart</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Overlay -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2>{{ selectedProduct.name }}</h2>
      <img :src="`/2024-2025/group-23/images/${selectedProduct.image}`" :alt="`${selectedProduct.name} Image`" class="modal-product-image" />
      <p>{{ selectedProduct.moreInfo }}</p>
      <p>Price: {{ selectedProduct.price }} ADCO/month</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Companion Bot",
          price: "150",
          image: "basicpack.png",
          description: "Get Started with AI-Powered Robotics! Ideal for beginners, this package offers foundational tools to automate simple tasks and explore the basics of robotic functionality.",
          moreInfo: "Features: Conversational bots. They can hold conversations, show interest, and act as a friend or companion."
        },
        {
          id: 2,
          name: "Butler Bot",
          price: "250",
          image: "basicplus.png",
          description: "An enhanced version of the Basic Bot, offering additional features for small businesses or personal projects looking to dive deeper into AI-driven solutions.",
          moreInfo: "Everything in Basic Package, plus robots for: Cleaning and Housekeeping."
        },
        {
          id: 3,
          name: "Study Bot",
          price: "350",
          image: "study.png",
          description: "A bot designed for study assistance, equipped with features to support educational activities and learning tasks effectively.",
          moreInfo: "Everything in Basic+ Package, plus: Educational Support with robots that can tutor in all subjects (e.g., Biology, Chemistry, Physics, etc.)."
        },
        {
          id: 4,
          name: "Expertise Bot",
          price: "650",
          image: "premium.png",
          description: "Boost Efficiency with Advanced Robotics! Designed for growing businesses, this package includes a suite of automation and analytics tools to take operations to the next level.",
          moreInfo: "Everything in Study Package, plus: Professional Expertise with robots capable of acting as doctors, professors, or lawyers."
        },
        {
          id: 5,
          name: "Vibranium Bot",
          price: "950",
          image: "ultra.png",
          description: "End-to-End Automation for Large-Scale Operations! Built with vibranium, this bot offers unmatched performance for large companies and complex workflows.",
          moreInfo: "Everything in Premium Package, plus: Advanced Services for security systems, industrial work, army support, and research assistance."
        },
        {
          id: 6,
          name: "Custom+ Bot",
          price: "200",
          image: "custom.png",
          description: "Tailored Solutions for Unique Needs! This package offers flexible options to create a fully personalized AI and robotics solution designed specifically for your industry and goals.",
          moreInfo: "Customizable options for tasks like specialized tutoring, corporate tasks, or custom operations, with pricing increasing per task."
        },
      ],
      searchQuery: '',
      showModal: false,
      selectedProduct: null,
      cart: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    goToCheckout() {
      this.$router.push({
        path: '/checkout',
        query: { cart: JSON.stringify(this.cart) } // Passing cart as a JSON string
      });
    },
    showMoreInfo(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    addToCart(product) {
      this.cart.push(product);
    },
    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
    }
  }
};
</script>

<style scoped>
.products-page {
  text-align: center;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center-align the cards */
  gap: 20px; /* Space between cards */
  padding: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 280px; /* Fixed width for each card */
  height: 500px; /* Fixed height for each card */
  flex-shrink: 0; /* Prevent shrinking */
  margin-bottom: 20px;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
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
  margin-bottom: 8px;
}

.product-description {
  color: #555;
  margin-bottom: 12px;
  font-size: 0.9em;
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  gap: 8px;
}

.info-button,
.cart-button {
  flex: 1;
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



/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
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
</style>

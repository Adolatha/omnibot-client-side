<template>
  <div class="container">
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
      </nav>
    </header>

    <div class="main-content">
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <nav class="side-nav">
          <div @click="loadComponent('WatchMyBot')" class="nav-item">
            Watch My Bot
          </div>
          <div @click="loadComponent('PurchaseHistory')" class="nav-item">
            Purchase History
          </div>
          <div @click="loadComponent('Notifications')" class="nav-item">
            Notifications
          </div>
          <div @click="loadComponent('Settings')" class="nav-item">
            Settings
          </div>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <div class="content">
        <!-- Dynamically load the component here -->
        <component :is="activeComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
// Import components
import WatchMyBot from "../components/WatchMyBot.vue";
import PurchaseHistory from "../components/PurchaseHistory.vue";
import Notifications from "../components/Notifications.vue";
import Settings from "../components/Settings.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      activeComponent: WatchMyBot, // Set default component to WatchMyBot
    };
  },
  methods: {
    loadComponent(componentName) {
      // Dynamically set the active component based on the clicked item
      this.activeComponent = {
        WatchMyBot,
        PurchaseHistory,
        Notifications,
        Settings,
      }[componentName] || WatchMyBot; // Default to WatchMyBot if component is not found
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  width: 100%;
  /* Add styling for the header */
}

.main-content {
  display: flex;
  flex: 1; /* Takes the remaining height after the header */
}

.sidebar {
  width: 250px;
  background-color: #2e2e2e;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px); /* Adjust this value to match the height of your header */
}

.side-nav {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.side-nav .nav-item {
  display: block;
  padding: 10px 15px;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.side-nav .nav-item:hover {
  background-color: #444;
}

.content {
  flex: 1;
  padding: 20px;
  /* Content styling */
}
</style>

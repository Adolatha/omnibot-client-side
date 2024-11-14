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
          <router-link to="/dashboard/watchmybot" class="nav-item">
            Watch My Bot
          </router-link>
          <router-link to="/dashboard/purchasehistory" class="nav-item">
            Purchase History
          </router-link>
          <router-link to="/dashboard/notifications" class="nav-item">
            Notifications
          </router-link>
          <router-link to="/dashboard/settings" class="nav-item">
            Settings
          </router-link>
          <router-link to="/dashboard/emergencyshutdown" class="nav-item emergency-shutdown">
            Emergency Shutdown
          </router-link>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <div class="content">
        <!-- Render the selected child component here based on route -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// No need to import individual components as they will be loaded through routing
export default {
  name: "Dashboard",
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

/* Style for Emergency Shutdown button */
.emergency-shutdown {
  background-color: #ff4d4d; /* Red color */
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.emergency-shutdown:hover {
  background-color: darkred; /* Darker red on hover */
}
</style>

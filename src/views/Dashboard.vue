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
          <router-link
              to="/dashboard/mybots"
              class="side-nav-item"
              :class="{ 'active-link': $route.path === '/dashboard/mybots' }"
          >
            My Bots
          </router-link>
          <router-link
              to="/dashboard/watchmybot"
              class="side-nav-item"
              :class="{ 'active-link': $route.path === '/dashboard/watchmybot' }"
          >Watch My Bot</router-link>
          <router-link
              to="/dashboard/purchasehistory"
              class="side-nav-item"
              :class="{ 'active-link': $route.path === '/dashboard/purchasehistory' }"
          >Purchase History</router-link>
          <router-link
              to="/dashboard/notifications"
              class="side-nav-item"
              :class="{ 'active-link': $route.path === '/dashboard/notifications' }"
          >Notifications</router-link>
          <router-link
              to="/dashboard/settings"
              class="side-nav-item"
              :class="{ 'active-link': $route.path === '/dashboard/settings' }"
          >Settings</router-link>

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
}

.nav {
  display: flex;
  gap: 15px;
}

.active-link {
  color: white;
  background-color: #007bff;
}


.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background-color: #2e2e2e;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.side-nav {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.side-nav .side-nav-item {
  display: block;
  padding: 10px 15px;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.side-nav .side-nav-item:hover {
  background-color: #444;
}

.side-nav .active-link {
  background-color: #444;
  font-weight: bold;
  color: white;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>

<template>
  <div class="container">
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

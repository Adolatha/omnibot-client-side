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
    </nav>
  </header>

</template>

<script>
export default {
  name: "Dashboard"
};
</script>

<style scoped>

</style>
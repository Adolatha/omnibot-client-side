<template>
  <div>
    <!-- Header Section -->
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

    <!-- Page Content -->
    <div class="about-page">
      <section class="content-section">
        <h2 class="page-title">About Omnibot</h2>
        <p class="intro-text">
          At Omnibot, we’re revolutionizing customer engagement with advanced, intelligent bots designed to deliver seamless, real-time support tailored to your business needs.
        </p>
        <div class="content-block">
          <h2>Our Mission</h2>
          <p>
            Our mission is to enhance customer satisfaction through technology that feels as intuitive and responsive as a conversation with a trusted friend. We strive to empower organizations to connect with their customers like never before, creating meaningful interactions that build trust and loyalty.
          </p>
        </div>
        <div class="content-block">
          <h2>Advanced Bots for Every Need</h2>
          <p>
            Omnibot’s bots are more than just automated responders. Equipped with machine learning and natural language processing, they can understand context, manage complex queries, and adapt over time, ensuring they meet the unique challenges of each business. Whether handling customer inquiries, processing transactions, or providing insights, Omnibot's bots grow and evolve to support your business goals.
          </p>
        </div>
        <div class="content-block">
          <h2>Why Choose Omnibot?</h2>
          <p>
            Omnibot is more than just a chatbot—it's a robust platform for modern customer engagement. Our AI solutions adapt to your evolving business needs, scale effortlessly, and integrate seamlessly with your systems. We are committed to providing industry-specific, high-quality bot solutions that empower your team and elevate customer service.
          </p>
        </div>
        <p class="conclusion-text">
          Experience the future of customer service with Omnibot—where innovation meets interaction, and every customer feels valued.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-page {
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.content-section {
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 20px;
}

.content-section h1 {
  font-size: 2.5em;
  color: #007bff;
  margin-bottom: 20px;
  font-weight: bold;
}

.intro-text {
  font-size: 1.2em;
  color: #555;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.content-block {
  margin-bottom: 30px;
}

.content-block h2 {
  font-size: 1.8em;
  color: #007bff;
  margin-bottom: 15px;
}

.content-block p {
  font-size: 1.1em;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.conclusion-text {
  font-size: 1.2em;
  color: #555;
  max-width: 800px;
  margin: 40px auto 0;
  font-style: italic;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-section h1 {
    font-size: 2em;
  }

  .content-block h2 {
    font-size: 1.6em;
  }

  .intro-text,
  .content-block p,
  .conclusion-text {
    font-size: 1em;
  }
}
</style>

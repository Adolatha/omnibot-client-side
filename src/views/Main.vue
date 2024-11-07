<template>
  <div class="home-container">
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
      </nav>
    </header>
    <div class="big">
      <div class="first">
    <section class="hero-section">
      <h1 class="hero-title">Changing Your Idea of What Robots Can Do.</h1>
      <p class="hero-subtitle">AI & Robotic Engineering</p>
      <p class="hero-description">
        Discover Omnibot – where innovation meets sustainability! Our products are
        crafted to empower you with high-quality, eco-friendly choices, delivered fast and
        hassle-free. With a commitment to easy returns, secure transactions, and
        exceptional customer care, Omnibot makes shopping smart, safe, and seamless.
        Join us on the journey to a greener future and enjoy the convenience and quality
        you deserve!
      </p>
      <button class="discover-button">DISCOVER MORE</button>
    </section>

    </div>
      <img class="robot-image" src="../assets/images/robotpics.png" alt="robotimage">

  </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-container {
  background-color: white;
  color: black;
  font-family: Arial, sans-serif;
}



.hero-section {
  padding: 60px 40px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.robot-image {
  width: 30%;
  background-image: url('../assets/images/robotpics.png');
  position: relative;
  align-self: flex-end;

}


.hero-title {
  font-size: 2.8rem;
  font-weight: bold;
  padding-right: 2.4rem;
  background: linear-gradient(90deg, #000000, #0000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-top: 20px;
}

.hero-description {
  font-size: 1rem;
  margin-top: 20px;
  max-width: 500px;
  line-height: 1.6;
}

.discover-button {
  background-color: navy;
  color: #fff;
  padding: 12px 24px;
  margin-top: 30px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.robot-image {
  display: flex;
  margin-top: 20px;
  max-width: 100%;
  float: top;
}

.experience-section {
  display: flex;
  padding: 40px;
  background-color: navy;
  gap: 30px;
}
.get-started-button:hover,
.discover-button:hover {
  background-color: darkblue;
}


.experience-box {
  flex: 1;
  color: #fff;
}

.experience-box h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.video-section {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.video-button {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
}
.big{
  display: flex;
}

</style>
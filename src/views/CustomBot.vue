<template>
  <div class="custom-bot-page">
    <h1 class="page-title">Customize Your Bot</h1>
    <p class="subtitle">Select packages to add to your custom bot.</p>

    <!-- List of Available Packages -->
    <div class="packages-list">
      <div
          v-for="(packageItem, index) in availablePackages"
          :key="index"
          class="package-item"
      >
        <input
            type="checkbox"
            :id="`package-${index}`"
            :value="packageItem"
            v-model="selectedPackages"
        />
        <label :for="`package-${index}`">
          {{ packageItem.name }} - {{ packageItem.price }} ADCO
        </label>
      </div>
    </div>

    <!-- Buttons -->
    <div class="button-group">
      <button class="cart-button" @click="saveCustomization">Save Customization</button>
      <button class="info-button" @click="goBack">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availablePackages: [
        { name: "Cleaning Homes", price: 20 },
        { name: "Technical Repairs", price: 35 },
        { name: "Security Patrol", price: 50 },
        { name: "Education Assistance", price: 25 },
      ],
      selectedPackages: [],
    };
  },
  methods: {
    saveCustomization() {
      if (this.selectedPackages.length === 0) {
        alert("Please select at least one package.");
        return;
      }

      const customBot = {
        name: "Custom Bot",
        packages: this.selectedPackages,
      };

      // Save the custom bot to localStorage or another state manager
      localStorage.setItem("customBot", JSON.stringify(customBot));

      alert("Customization saved successfully!");
      this.$router.push("/products");
    },
    goBack() {
      this.$router.push("/products");
    },
  },
};
</script>

<style scoped>
.custom-bot-page {
  padding: 20px;
  text-align: center;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #555;
}

.packages-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.package-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.package-item input {
  margin-right: 10px;
}

.button-group {
  margin-top: 20px;
}

.cart-button,
.info-button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

.cart-button:hover,
.info-button:hover {
  background-color: #0056b3;
}
</style>

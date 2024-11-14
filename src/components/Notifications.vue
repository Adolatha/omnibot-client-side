<template>
  <div class="notifications-container">
    <div class="notifications-box">
      <div class="notifications-header">
        <h2>Notifications</h2>
        <div class="toggle-switch">
          <label class="switch">
            <input type="checkbox" @change="toggleSubscription" v-model="isSubscribed">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="notifications-list">
        <!-- Display notifications here dynamically, if they are fetched from the server -->
        <p>No new notifications</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  data() {
    return {
      isSubscribed: false, // Track the subscription status
    };
  },
  methods: {
    toggleSubscription() {
      if (this.isSubscribed) {
        this.subscribeToNotifications();
      } else {
        this.unsubscribeFromNotifications();
      }
    },
    subscribeToNotifications() {
      console.log("Subscribed to notifications");
      // Add the actual subscription code here
    },
    unsubscribeFromNotifications() {
      console.log("Unsubscribed from notifications");
      // Add the actual unsubscription code here
    }
  }
};
</script>

<style scoped>
.notifications-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.notifications-box {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.notifications-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin: 0 1rem 0 0;
}

.notifications-list {
  margin-top: 10px;
  color: #666;
}

.toggle-switch {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>

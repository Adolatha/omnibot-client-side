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
import { post } from "../assets/utils/api/api-methods"; // Adjust the path as necessary

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
    async registerServiceWorker() {
      // Check and request notification permissions
      if (Notification.permission === "default") {
        await Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else {
            console.warn("Notification permission denied.");
          }
        });
      }

      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const swReg = await navigator.serviceWorker.register('/service-worker.js');
          console.log('Service Worker is registered', swReg);

          let subscription = await swReg.pushManager.getSubscription();

          if (subscription === null) {
            subscription = await swReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlBase64ToUint8Array(
                  'BJe2fcX0k7Mbw-GbqX6zzFvgVekBDR8qyFRbu1TjUp5ggSLJMjCUTmoRTV_IRMa9YNkag8d0lakv2IdQ2cA9ikU'
              )
            });
            console.log('User is subscribed:', subscription);
            await this.sendSubscriptionToServer(subscription);
          } else {
            console.log('User is already subscribed:', subscription);
          }
        } catch (error) {
          console.error('Service Worker Error', error);
        }
      }
    },

    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
    async sendSubscriptionToServer(subscription) {
      try {
        const response = await post("/subscribe", subscription);
        console.log("Subscription sent to server:", response);
      } catch (error) {
        console.error("Failed to send subscription to server:", error);
      }
    },
    subscribeToNotifications() {
      console.log("Subscribing to notifications...");
      this.registerServiceWorker();
    },
    async unsubscribeFromNotifications() {
      console.log("Unsubscribing from notifications...");
      const swReg = await navigator.serviceWorker.ready;
      const subscription = await swReg.pushManager.getSubscription();

      if (subscription) {
        try {
          await subscription.unsubscribe();
          console.log("User unsubscribed from notifications.");
          await this.sendUnsubscriptionToServer(subscription);
        } catch (error) {
          console.error("Error while unsubscribing:", error);
        }
      }
    },
    async sendUnsubscriptionToServer(subscription) {
      try {
        const response = await post("/unsubscribe", subscription);
        console.log("Unsubscription sent to server:", response);
      } catch (error) {
        console.error("Failed to send unsubscription to server:", error);
      }
    },
  },
  mounted() {
    // Request notification permission if not already granted
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.warn("Notification permission denied.");
        }
      });
    }
    // Register the service worker after requesting permission
    this.registerServiceWorker();
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
  background-color: #4CAF50; /* Green when subscribed */
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>

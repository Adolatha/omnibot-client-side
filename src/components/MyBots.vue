<template>
  <div class="my-bots-container">
    <h2>My Bots</h2>

    <!-- Display bots if available -->
    <div v-if="bots && bots.length" class="bot-list-container">
      <ul class="bot-list">
        <li v-for="bot in bots" :key="bot.id" class="bot-item">
          <div class="bot-card">
            <div class="bot-info">
              <h3 class="bot-name">{{ bot.name }}</h3>
              <p class="bot-status" :class="getStatusClass(bot.status)">
                {{ bot.status }}
              </p>
            </div>
            <div class="bot-actions">
              <slot name="bot-action" :bot="bot">
                <button
                    @click="shutdownBot(bot)"
                    :disabled="bot.status !== 'Running'"
                    class="shutdown-btn"
                >
                  Shutdown Bot
                </button>
              </slot>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Display a message when no bots are available -->
    <div v-else class="no-bots">
      <p>No bots available.</p>
    </div>
  </div>
</template>

<script>
import { post } from "../assets/utils/api/api-methods.js";
import basketService from "../services/basketService.js";

export default {
  name: "MyBots",
  data() {
    return {
      bots: [], // Will store robots from the basket
      basketId: null, // Dynamic basket ID
    };
  },
  methods: {
    async fetchLatestBasketId() {
      try {
        const basketIds = await basketService.getBasketIds();
        this.basketId = basketIds[basketIds.length-2];
        console.log("Latest basketId:", this.basketId);
      } catch (error) {
        console.error("Failed to fetch basket IDs:", error);
      }
    },

    // Fetch robots in the latest basket
    async fetchBots() {
      if (!this.basketId) {
        console.error("Basket ID is not set.");
        return;
      }

      try {
        const response = await post("basket/retrieve", {
          basketId: this.basketId,
        });
        if (response.robots && response.robots.length > 0) {
          this.bots = response.robots.map((robot) => ({
            id: robot.id,
            name: robot.name,
            status: "Running", // Default status as 'Running' or modify as needed
          }));
        } else {
          console.warn("No bots found in the basket.");
          this.bots = [];
        }
      } catch (error) {
        console.error("Failed to fetch robots:", error);
        this.bots = [];
      }
    },

    // Shutdown a bot
    shutdownBot(bot) {
      console.log(`Shutting down ${bot.name}`);
      bot.status = "Shutdown";
    },

    // Determine CSS class for bot status
    getStatusClass(status) {
      return {
        "status-running": status === "Running",
        "status-shutdown": status === "Shutdown",
      };
    },
  },
  async mounted() {
    await this.fetchLatestBasketId(); // Retrieve the latest basket ID
    if (this.basketId) {
      await this.fetchBots(); // Fetch bots for the latest basket
    }
  },
};
</script>

<style scoped>
.my-bots-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.bot-list-container {
  max-height: 400px;
  overflow-y: auto;
}

.bot-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.bot-item {
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.bot-item:hover {
  transform: translateY(-5px);
}

.bot-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.bot-info {
  flex: 1;
}

.bot-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.bot-status {
  font-size: 14px;
  margin-top: 5px;
  color: #666;
}

.bot-actions {
  display: flex;
  align-items: center;
}

.shutdown-btn {
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shutdown-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.shutdown-btn:hover:enabled {
  background-color: #c82333;
}

.status-running {
  color: #28a745;
}

.status-shutdown {
  color: red;
}

.no-bots {
  text-align: center;
  color: #999;
}
</style>

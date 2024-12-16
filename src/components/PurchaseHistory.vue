<template>
  <div class="order-history">
    <h2>Order History</h2>

    <!-- Orders Table -->
    <div class="order-table">
      <table v-if="orders.length">
        <thead>
        <tr>
          <th>Bot Name</th>
          <th>Status</th>
          <th>Total Price (ADCO)</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(robot, index) in orders" :key="index">
          <td>{{ robot.name }}</td>
          <td>
              <span :class="getOrderStatusClass(robot.status)">
                {{ robot.status }}
              </span>
          </td>
          <td>{{ robot.price || 'N/A' }} ADCO</td>
          <td>
            <button @click="viewOrderDetails(robot)">View Details</button>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>No orders available at this time.</p>
    </div>

    <!-- Order Details Modal -->
    <div v-if="isOrderDetailsVisible" class="order-details-modal">
      <div class="modal-content">
        <span class="close" @click="closeOrderDetails">&times;</span>
        <h3>Order Details</h3>
        <p><strong>Bot Name:</strong> {{ currentOrder.name }}</p>
        <p><strong>Status:</strong> {{ currentOrder.status }}</p>
        <p><strong>Price:</strong> {{ currentOrder.price }} ADCO</p>
        <p><strong>Order ID:</strong> {{ currentOrder.id || "N/A" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../assets/utils/api/api-methods.js";
import basketService from "../services/basketService.js";

export default {
  name: "OrderHistory",
  data() {
    return {
      orders: [], // Directly hold robots as orders
      basketId: null,
      userId: "ff78ea26-33ad-4b35-9c86-87d08b2597dd", // Replace with your user ID
      isOrderDetailsVisible: false,
      currentOrder: null,
    };
  },
  mounted() {
    this.fetchLatestBasketId();
  },
  methods: {
    // Fetch latest basket ID
    async fetchLatestBasketId() {
      try {
        const basketIds = await basketService.getBasketIds();
        this.basketId = basketIds[basketIds.length - 1];
        this.fetchRobots();
      } catch (error) {
        console.error("Error fetching basket ID:", error);
      }
    },

    // Fetch robots and set as orders
    async fetchRobots() {
      if (!this.basketId) return;
      try {
        const response = await post("basket/retrieve", {
          userId: this.userId,
          basketId: this.basketId,
        });

        // Directly assign robots to orders
        this.orders = response.robots || [];
      } catch (error) {
        console.error("Error fetching robots:", error);
      }
    },

    // View order details
    viewOrderDetails(robot) {
      this.currentOrder = robot;
      this.isOrderDetailsVisible = true;
    },

    // Close order details
    closeOrderDetails() {
      this.isOrderDetailsVisible = false;
    },

    // Add class for status
    getOrderStatusClass(status) {
      return status === "Delivered" ? "delivered" : "pending";
    },
  },
};
</script>

<style scoped>
/* Order History Styles */
.order-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #f8f9fa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.order-table table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th,
.order-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.order-table th {
  background-color: #3498db;
  color: white;
}

.order-table td {
  font-size: 1.1rem;
}

.order-table button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-table button:hover {
  background-color: #2980b9;
}

.delivered {
  color: #28a745;
}

.pending {
  color: #f39c12;
}

.order-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
}

h3 {
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
}
</style>

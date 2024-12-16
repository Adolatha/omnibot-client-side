<template>
  <div class="order-history">
    <h2>Order History</h2>

    <!-- Orders Table -->
    <div class="order-table">
      <table>
        <thead>
        <tr>
          <th>Order ID</th>
          <th>Bot Name</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Total Price (ADCO)</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.botName }}</td>
          <td>{{ formatDate(order.orderDate) }}</td>
          <td>
              <span :class="getOrderStatusClass(order.status)">
                {{ order.status }}
              </span>
          </td>
          <td>{{ order.totalPrice }} ADCO</td>
          <td>
            <button @click="viewOrderDetails(order.id)">View Details</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Details Modal -->
    <div v-if="isOrderDetailsVisible" class="order-details-modal">
      <div class="modal-content">
        <span class="close" @click="closeOrderDetails">&times;</span>
        <h3>Order Details for {{ currentOrder.botName }}:</h3>
        <p><strong>Order ID:</strong> {{ currentOrder.id }}</p>
        <p><strong>Order Date:</strong> {{ formatDate(currentOrder.orderDate) }}</p>
        <p><strong>Status:</strong> {{ currentOrder.status }}</p>
        <p><strong>Total Price:</strong> {{ currentOrder.totalPrice }} ADCO</p>
        <p><strong>Tracking Number:</strong> {{ currentOrder.trackingNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHistory",
  data() {
    return {
      orders: [
        {
          id: 101,
          botName: "Butler Bot",
          orderDate: "2024-09-25",
          status: "Delivered",
          totalPrice: 250,
          trackingNumber: "XYZ12345"
        },
        {
          id: 102,
          botName: "Study Bot",
          orderDate: "2024-09-30",
          status: "Delivered",
          totalPrice: 350,
          trackingNumber: "ABC67890"
        },
        {
          id: 103,
          botName: "Companion Bot",
          orderDate: "2024-10-05",
          status: "Pending",
          totalPrice: 150,
          trackingNumber: "LMN11223"
        }
      ],
      isOrderDetailsVisible: false,
      currentOrder: null
    };
  },
  methods: {
    // Method to format the date as dd-mm-yyyy
    formatDate(date) {
      const formattedDate = new Date(date);
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const year = formattedDate.getFullYear();
      return `${day}-${month}-${year}`;
    },
    // Method to display order details
    viewOrderDetails(orderId) {
      this.currentOrder = this.orders.find(order => order.id === orderId);
      this.isOrderDetailsVisible = true;
    },
    // Method to close order details modal
    closeOrderDetails() {
      this.isOrderDetailsVisible = false;
    },
    // Method to get the CSS class for order status
    getOrderStatusClass(status) {
      if (status === "Delivered") return "delivered";
      return "pending";
    }
  }
};
</script>

<style scoped>
/* Order History Page Styling */
.order-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #2c3e50;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Table Styling */
.order-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-table th, .order-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.order-table th {
  background-color: #3498db;
  color: white;
  font-size: 1.2rem;
}

.order-table td {
  font-size: 1.1rem;
  color: #333;
}

.order-table button {
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-table button:hover {
  background-color: #2980b9;
}

/* Order Status Colors */
.delivered {
  color: #28a745;
}

.pending {
  color: #f39c12;
}

/* Modal Styling */
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
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 60%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
}

h3 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin: 5px 0;
}

p strong {
  font-weight: bold;
}
</style>

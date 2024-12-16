<template>
  <div class="watch-my-bot">
    <h2>Watch My Bot Live</h2>

    <!-- Robot selection dropdown -->
    <div class="robot-selector">
      <label for="robot-select">Select a Robot:</label>
      <select id="robot-select" v-model="selectedRobotId" @change="updateBotDetails">
        <option v-for="robot in robots" :key="robot.id" :value="robot.id">
          {{ robot.name }}
        </option>
      </select>
    </div>

    <!-- Video container -->
    <div class="video-container">
      <iframe
          v-if="isVideoAvailable"
          :src="videoEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video"
      ></iframe>
      <div v-else>
        <p class="error-message">Video feed is not available at the moment.</p>
      </div>
    </div>

    <!-- Map and Progress Container -->
    <div class="map-progress-container">
      <!-- Leaflet Map Container -->
      <div id="map" class="map"></div>

      <!-- Progress Section -->
      <div class="progress-section">
        <p><strong>Task Name:</strong> {{ taskName }}</p>
        <p><strong>Task Progress:</strong> {{ taskProgress }}%</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: taskProgress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { post } from "../assets/utils/api/api-methods.js";
import basketService from "../services/basketService.js"; // Import the basket service

export default {
  name: "WatchMyBot",
  data() {
    return {
      robots: [], // Will store robots from the latest basket
      selectedRobotId: null,
      videoEmbedUrl: "",
      taskName: "",
      taskProgress: 0,
      isVideoAvailable: false,
      map: null,
      marker: null,
      loading: false,
      error: null,
      basketId: null, // Dynamic basketId
      userId: "ff78ea26-33ad-4b35-9c86-87d08b2597dd", // Replace with your user ID
    };
  },
  mounted() {
    this.fetchLatestBasketId(); // Fetch the latest basket ID
    this.initializeMap();
  },
  methods: {
    async fetchLatestBasketId() {
      try {
        const basketIds = await basketService.getBasketIds(); // Fetch the basket IDs
        this.basketId = basketIds[basketIds.length - 1]; // Get the latest basketId
        this.fetchRobots(); // Once we have the basket ID, fetch the robots
      } catch (error) {
        this.error = "Failed to fetch basket IDs. Please try again later.";
      }
    },

    async fetchRobots() {
      if (!this.basketId) {
        console.error("Basket ID is not available.");
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await post("basket/retrieve", {
          userId: this.userId,
          basketId: this.basketId,
        });
        if (response.robots && response.robots.length > 0) {
          this.robots = response.robots; // Set the robots array with the fetched robots
          this.selectedRobotId = this.robots.length ? this.robots[0].id : null;
          this.updateBotDetails(); // Update details for the first robot
        } else {
          console.warn("No robots found in the basket.");
          this.robots = [];
        }
      } catch (error) {
        this.error = "Failed to load robots. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    initializeMap() {
      // Initialize the map and set the initial view to a default location
      this.map = L.map("map").setView([0, 0], 10);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Add an initial marker
      this.marker = L.marker([0, 0]).addTo(this.map);
    },

    updateBotDetails() {
      const selectedRobot = this.robots.find(
          (robot) => robot.id === this.selectedRobotId
      );

      if (selectedRobot) {
        // Update video embed URL with autoplay and task progress
        if (selectedRobot.videoUrl) {
          this.videoEmbedUrl = `${selectedRobot.videoUrl}?autoplay=1`;
          this.isVideoAvailable = true;
        } else {
          this.isVideoAvailable = false;
        }

        // Update task details
        this.taskName = selectedRobot.task.taskName || "Unknown Task";
        this.taskProgress = selectedRobot.task.percentage || 0;

        // Update the map view and marker position based on the selected robot's location
        const { latitude, longitude } = selectedRobot.location;
        this.map.setView([latitude, longitude], 13);
        this.marker.setLatLng([latitude, longitude])
            .bindPopup(selectedRobot.name)
            .openPopup();
      }
    },
  },
};
</script>

<style scoped>
.watch-my-bot {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  font-family: 'Arial', sans-serif;
  color: #333;
  border-radius: 10px;
  box-sizing: border-box;
  min-height: 100vh;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
  text-transform: uppercase;
  font-weight: bold;
}

.robot-selector {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.robot-selector label {
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.2rem;
  color: #444;
}

.robot-selector select {
  padding: 12px;
  font-size: 1.1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  width: 220px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.robot-selector select:focus {
  outline: none;
  background-color: #2980b9;
}

.video-container {
  max-width: 850px;
  width: 100%;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #2980b9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

.video-container p {
  color: red;
  font-size: 1.4rem;
  font-weight: bold;
}

.video {
  width: 100%;
  max-width: 800px;
  height: 450px;
  border-radius: 8px;
}

.map-progress-container {
  margin-top: 3rem;
  width: 100%;
  max-width: 850px;
}

.map {
  width: 100%;
  height: 350px;
  margin-bottom: 30px;
  border: 5px solid #3498db;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

.progress-section {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
  background-color: #ddd;
  border-radius: 40px;
  height: 30px;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>

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
import { get } from "../assets/utils/api/api-methods.js";

export default {
  name: "WatchMyBot",
  data() {
    return {
      robots: [],
      selectedRobotId: null,
      videoEmbedUrl: "",
      taskName: "", // Added taskName
      taskProgress: 0,
      isVideoAvailable: false,
      map: null,
      marker: null,
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchRobots();
    this.initializeMap();
  },
  methods: {
    async fetchRobots() {
      this.loading = true;
      this.error = null;
      try {
        const response = await get("/robots");
        this.robots = response.robots; // Assuming the API returns { robots: [...] }
        this.selectedRobotId = this.robots.length ? this.robots[0].id : null;
        this.updateBotDetails();
      } catch (error) {
        this.error = "Failed to load robots. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    initializeMap() {
      // Initialize the map and set the initial view to a default location
      this.map = L.map("map").setView([37.7749, -122.4194], 13);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Add an initial marker
      this.marker = L.marker([37.7749, -122.4194]).addTo(this.map);
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
        this.taskName = selectedRobot.task.taskName || "Unknown Task"; // Add task name
        this.taskProgress = selectedRobot.task.percentage || 0; // Add task progress

        // Update the map view and marker position based on the selected robot's location
        const { latitude, longitude } = selectedRobot.location; // Adjusted to use robot.location
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
  border-radius: 12px;
  height: 20px;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>

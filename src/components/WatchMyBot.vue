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
      <video v-if="isVideoAvailable" class="video" controls autoplay>
        <source :src="videoUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
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
        <p>Task Progress: {{ taskProgress }}%</p>
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

export default {
  name: "WatchMyBot",
  data() {
    return {
      robots: [
        {
          id: 1,
          name: "Study Bot",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          latitude: 37.7749,
          longitude: -122.4194,
          taskProgress: 60
        },
        {
          id: 2,
          name: "Companion Bot",
          videoUrl: "",
          latitude: 34.0522,
          longitude: -118.2437,
          taskProgress: 85
        },
        {
          id: 3,
          name: "Butler Bot",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          latitude: 40.7128,
          longitude: -74.006,
          taskProgress: 30
        }
      ],
      selectedRobotId: 1,
      videoUrl: '',
      taskProgress: 0,
      isVideoAvailable: false,
      map: null,
      marker: null
    };
  },
  mounted() {
    this.initializeMap();
    this.updateBotDetails();
  },
  methods: {
    initializeMap() {
      // Initialize the map and set the initial view to a default location
      this.map = L.map("map").setView([37.7749, -122.4194], 13);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Add an initial marker
      this.marker = L.marker([37.7749, -122.4194]).addTo(this.map);
    },
    updateBotDetails() {
      const selectedRobot = this.robots.find(robot => robot.id === this.selectedRobotId);

      if (selectedRobot) {
        // Update video URL and task progress
        this.videoUrl = selectedRobot.videoUrl;
        this.taskProgress = selectedRobot.taskProgress;
        this.isVideoAvailable = !!this.videoUrl;

        // Update the map view and marker position based on the selected robot's location
        const { latitude, longitude } = selectedRobot;
        this.map.setView([latitude, longitude], 13);
        this.marker.setLatLng([latitude, longitude]).bindPopup(selectedRobot.name).openPopup();
      }
    }
  }
};
</script>

<style scoped>
.watch-my-bot {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f4f4f4;
  font-family: 'Arial', sans-serif;
  color: #333;
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
  height: auto;
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

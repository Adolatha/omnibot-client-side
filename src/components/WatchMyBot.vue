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
        <p>Video feed is not available at the moment.</p>
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
          name: "Robot A",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          latitude: 37.7749,
          longitude: -122.4194,
          taskProgress: 60
        },
        {
          id: 2,
          name: "Robot B",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          latitude: 34.0522,
          longitude: -118.2437,
          taskProgress: 85
        },
        {
          id: 3,
          name: "Robot C",
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
  padding: 20px;
}

.robot-selector {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif; /* Optional: choose a consistent font */
}

.robot-selector label {
  color: #333; /* Adjust the label color */
  font-weight: bold;
  margin-bottom: 5px;
}

.robot-selector select {
  padding: 10px;
  font-size: 1rem;
  background-color: #2e2e2e; /* Match with sidebar color if needed */
  color: #fff;
  border: 1px solid #444; /* Border color for a subtle outline */
  border-radius: 5px; /* Rounded corners */
  width: 200px; /* Adjust width as desired */
  appearance: none; /* Removes default dropdown icon in some browsers */
}

.robot-selector select:focus {
  outline: none;
  border-color: #888; /* Highlight border on focus */
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
}

.video-container {
  max-width: 800px;
  width: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video {
  width: 100%;
  max-width: 800px;
  height: auto;
}

.map-progress-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 800px; /* Ensure the map matches the max width of the video */
}

.map {
  width: 100%; /* Make the map take up the full width of its container */
  height: 300px; /* Adjust height as needed */
  margin-bottom: 20px;
}


.progress-section {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.progress-bar {
  width: 100%;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  height: 20px;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

p {
  color: #333;
}
</style>

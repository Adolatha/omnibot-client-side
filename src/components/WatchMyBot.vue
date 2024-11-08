<template>
  <div class="watch-my-bot">
    <h2>Watch My Bot Live</h2>
    <div class="video-container">
      <!-- Example of a static video (replace the URL with the actual video source) -->
      <video v-if="isVideoAvailable" class="video" controls autoplay>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div v-else>
        <p>Video feed is not available at the moment.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WatchMyBot",
  data() {
    return {
      isVideoAvailable: true, // Set this to true or false depending on your actual video source status
    };
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

p {
  color: #ff0000;
}
</style>

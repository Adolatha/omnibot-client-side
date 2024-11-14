<template>
  <div class="emergency-shutdown-container">
    <h2>Select a Bot to Shutdown</h2>
    <p class="instructions">Click on a bot below to initiate an emergency shutdown.</p>
    <ul class="bot-list">
      <li v-for="bot in bots" :key="bot.id" @click="shutdownBot(bot)">
        {{ bot.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EmergencyShutdown",
  data() {
    return {
      bots: [
        { id: 1, name: "Study Bot" },
        { id: 2, name: "Companion Bot" },
        { id: 3, name: "Butler Bot" }
      ]
    };
  },
  methods: {
    shutdownBot(bot) {
      alert(`Emergency Shutdown initiated for ${bot.name}`);
      // Here you can add code to handle the shutdown action.
    }
  }
};
</script>

<style scoped>
.emergency-shutdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: 600;
}

.instructions {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

.bot-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.bot-list li {
  cursor: pointer;
  padding: 12px;
  margin: 8px 0;
  background-color: #ff4d4d;
  color: #fff;
  font-weight: 500;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.2);
}

.bot-list li:hover {
  background-color: #ff3333;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 51, 51, 0.3);
}

.bot-list li:active {
  transform: translateY(0);
  background-color: #e63939;
}
</style>

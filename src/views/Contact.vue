<template>
  <header class="header">
    <img src="@/assets/images/OMNIBOT.png" alt="logo" class="logo" />
    <nav class="nav">
      <router-link
          to="/dashboard"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/dashboard' }"
      >Dashboard</router-link>
      <router-link
          to="/main"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/main' }"
      >Home</router-link>
      <router-link
          to="/about"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/about' }"
      >About us</router-link>
      <router-link
          to="/products"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/products' }"
      >Products</router-link>
      <router-link
          to="/contact"
          class="nav-item"
          :class="{ 'active-link': $route.path === '/contact' }"
      >Contact us</router-link>
    </nav>
  </header>
  <div class="contact-page">
    <h2>Contact Us</h2>
    <p>If you have any questions, ask us here and our AI will help you!</p>

    <!-- Chatbox -->
    <div class="chat-container">
      <div class="messages" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div class="message-content" :class="message.type">
            <p>{{ message.text }}</p>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="message typing-indicator">
          <div class="message-content ai">
            <p>Typing...</p>
          </div>
        </div>
      </div>

      <div class="input-container">
        <input v-model="userMessage" placeholder="Ask a question..." @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      isProcessing: false,
      isTyping: false, // Indicates if AI is "typing"
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === '') return; // Skip empty messages
      this.messages.push({ text: this.userMessage, type: 'user' }); // Add user message
      this.isProcessing = true;
      this.isTyping = true; // Show typing indicator

      // Simulate a 3-second delay
      setTimeout(() => {
        this.isTyping = false; // Hide typing indicator

        // Show overload message from AI
        this.messages.push({
          text: 'We are overloaded with messages at the moment, try at another time.',
          type: 'ai',
        });

        // Clear the input field and reset processing state
        this.userMessage = '';
        this.isProcessing = false;

        // Scroll to the bottom of the chat container
        this.$nextTick(() => {
          this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        });
      }, 3000);
    },
  },
};
</script>


<style scoped>
.contact-page {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 800px;
  margin: 2rem auto 0;
}

.chat-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.message-content {
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
}

.message-content.user {
  background-color: #d1e7ff;
  align-self: flex-end;
}

.message-content.ai {
  background-color: #f0f0f0;
}

.typing-indicator .message-content {
  font-style: italic;
  color: #888;
}

.input-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

input {
  width: 80%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

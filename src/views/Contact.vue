<template>
  <div class="contact-page">
    <h2 class="page-title">Contact Us</h2>
    <p class="subtitle">If you have any questions, ask us here and our AI will help you!</p>

    <div class="content-container">
      <!-- FAQ Section -->
      <div class="faq-container">
        <h3>Frequently Asked Questions</h3>
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <details>
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>

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
              <p>Omnibot AI is typing...</p>
            </div>
          </div>
        </div>

        <div class="input-container">
          <input
              v-model="userMessage"
              placeholder="Ask a question..."
              @keyup.enter="sendMessage"
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const AI_TYPING_DELAY = 3000;

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      isProcessing: false,
      isTyping: false,
      faqs: [
        { question: "What is Omnibot used for?", answer: "Omnibot is an AI-powered assistant designed to answer your queries and provide support instantly." },
        { question: "Is Omnibot available 24/7?", answer: "Yes, Omnibot is available at all times to assist you with your questions." },
        { question: "Can I get personalized recommendations?", answer: "Yes, Omnibot can provide recommendations based on your preferences and history." },
        { question: "How secure is my information with Omnibot?", answer: "Your information is securely encrypted and handled in compliance with privacy regulations." },
      ]
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === '') return;
      this.messages.push({ text: this.userMessage, type: 'user' });
      this.isTyping = true;

      setTimeout(() => {
        this.isTyping = false;
        this.messages.push({
          text: 'We are overloaded with messages at the moment, try at another time.',
          type: 'ai',
        });

        this.userMessage = '';
        this.$nextTick(() => {
          this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        });
      }, AI_TYPING_DELAY);
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
  background-color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 2rem auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

/* Flex container for side-by-side layout */
.content-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}

/* FAQ Section */
.faq-container {
  flex: 1;
  max-width: 45%;
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.faq-container h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: #333;
}

.faq-item {
  margin-bottom: 10px;
}

details {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

details summary {
  font-weight: bold;
  color: #333;
}

details p {
  margin: 5px 0 0 0;
  color: #555;
}

/* Chat Section */
.chat-container {
  flex: 1;
  max-width: 45%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

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

/* Responsive Design */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    align-items: center;
  }

  .faq-container,
  .chat-container {
    max-width: 100%;
  }
}
</style>
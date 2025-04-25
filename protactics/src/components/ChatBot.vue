<template>
  <div class="chatbot-container">
    <div class="chat-window">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div v-if="message.role === 'user'" class="user-message">{{ message.content }}</div>
        <div v-if="message.role === 'assistant'" class="bot-message">{{ message.content }}</div>
      </div>
    </div>
    <input 
      v-model="userInput" 
      @keydown.enter="sendMessage" 
      placeholder="Escribe tu mensaje..." 
      class="chat-input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "", // Entrada del usuario
      messages: [], // Lista de mensajes del chat
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === "") return; // No enviar si está vacío

      const userMessage = {
        role: "user",
        content: this.userInput,
      };

      this.messages.push(userMessage); // Añadir el mensaje del usuario al chat
      this.userInput = ""; // Limpiar la entrada

      try {
        const response = await this.$axios.post("http://localhost:3000/api/chatbot/chat", {
          message: userMessage.content,
        });

        // Respuesta del bot
        const botMessage = {
          role: "assistant",
          content: response.data.reply,
        };

        this.messages.push(botMessage); // Añadir la respuesta del bot
      } catch (error) {
        console.error("Error al obtener respuesta del chatbot:", error);
      }
    },
  },
};
</script>

<style scoped>
.chatbot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease-out;
}

.chat-window {
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
}

.user-message {
  background-color: #25d366; /* Verde de WhatsApp */
  color: white;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
  align-self: flex-end;
  word-wrap: break-word;
}

.bot-message {
  background-color: #ece5dd; /* Gris de WhatsApp */
  color: #333;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
  word-wrap: break-word;
}

.chat-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

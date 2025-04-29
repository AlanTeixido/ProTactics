<template>
  <div id="chatbot-container">
    <!-- Chatbot visible -->
    <div v-if="isOpen" id="chatbot" class="chatbot-window">
      <div id="chatbot-header">
        <span>ChatBot</span>
        <button @click="closeChatbot" id="close-chatbot">X</button>
      </div>

      <div id="chatbox">
        <!-- Campo de búsqueda -->
        <input 
          type="text" 
          id="search-input" 
          v-model="searchQuery" 
          placeholder="Busca una pregunta..."
        />

        <!-- Lista de preguntas -->
        <div v-if="!selectedResponse" id="questions-scroll">
          <div 
            v-for="(question, index) in filteredQuestions" 
            :key="index" 
            class="question" 
            @click="askQuestion(question)"
          >
            {{ question.pregunta }}
          </div>

          <div v-if="filteredQuestions.length === 0" class="no-results">
            No se encontraron preguntas.
          </div>
        </div>

        <!-- Respuesta -->
        <div v-else id="chat-response">
          <div class="response">{{ selectedResponse }}</div>
          <button class="back-button" @click="resetChat">Volver</button>
        </div>
      </div>
    </div>

    <!-- Botón flotante -->
    <button @click="openChatbot" id="open-chatbot" v-if="!isOpen">Abrir ChatBot</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isOpen: false,
      searchQuery: "",
      selectedResponse: null,
      questions: [],
    };
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter((q) =>
        q.pregunta.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    openChatbot() {
      this.isOpen = true;
      this.fetchQuestions();
    },
    closeChatbot() {
      this.isOpen = false;
      this.resetChat();
    },
    resetChat() {
      this.searchQuery = "";
      this.selectedResponse = null;
    },
    askQuestion(question) {
      this.selectedResponse = question.respuesta;
    },
    async fetchQuestions() {
      try {
        const res = await axios.get("http://localhost:3000/api/chatbot/preguntas");
        this.questions = res.data;
      } catch (err) {
        console.error("Error al obtener preguntas:", err);
      }
    },
  },
};
</script>

<style scoped>
#chatbot-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

#chatbot {
  width: 320px;
  height: 290px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#chatbot-header {
  background-color: #22d3ee;
  padding: 10px 16px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#close-chatbot {
  background: none;
  border: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
}

#chatbox {
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#search-input {
  width: 90%;
  padding: 6px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

#questions-scroll {
  max-height: 150px; /* 3 preguntas aprox */
  overflow-y: auto;
  border-top: 1px solid #eee;
  padding-top: 5px;
}

.question {
  background-color: #91e3ee;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.question:hover {
  background-color: #91eeb5;
}

.no-results {
  color: #999;
  font-style: italic;
  margin-top: 10px;
}

#chat-response {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.response {
  background-color: #1e293b;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.back-button {
  background-color: #22d3ee;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
}

#open-chatbot {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #22d3ee;
  border: none;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>

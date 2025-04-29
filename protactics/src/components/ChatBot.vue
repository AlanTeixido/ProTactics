<template>
  <div>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.label">
          <!-- Si tiene una ruta, usamos router-link -->
          <router-link v-if="item.path" :to="item.path">{{ item.label }}</router-link>
          <!-- Si tiene una acción, ejecutamos el método correspondiente -->
          <button v-if="item.action" @click="openChatbot">{{ item.label }}</button>
        </li>
      </ul>
    </nav>

    <!-- Chatbot aquí -->
    <div v-if="isOpen" id="chatbot-container">
      <div id="chatbot" class="chatbot-window">
        <div id="chatbot-header">
          <span>ChatBot</span>
          <button @click="closeChatbot" id="close-chatbot">X</button>
        </div>
        <div id="chatbox">
          <input 
            type="text" 
            id="search-input" 
            v-model="searchQuery" 
            placeholder="Busca una pregunta..."
          />
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
          <div v-else id="chat-response">
            <div class="response">{{ selectedResponse }}</div>
            <button class="back-button" @click="resetChat">Volver</button>
          </div>
        </div>
      </div>
    </div>
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

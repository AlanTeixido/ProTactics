<script setup>
import Footer from '@/components/Footer.vue';
import Header1 from '@/components/Header1.vue';
import { ref } from 'vue';

// Datos de ejemplo para el perfil
const user = ref({
  username: '@juanperez',
  name: 'Juan Pérez',
  age: 28,
  posts: 123,
  shared: 45
});

const goToPage = (page) => {
  console.log(`Redirigiendo a la página de ${page}...`);
  // Aquí podrías usar Vue Router para redirigir a páginas ficticias
};
</script>

<template>
    <Header1/>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <h2>{{ user.name }} ({{ user.username }})</h2>
      </div>
      <div class="profile-body">
        <p><strong>Edad:</strong> {{ user.age }} años</p>
        <p><strong>Número de Posts:</strong> {{ user.posts }}</p>
        <p><strong>Número de Compartidos:</strong> {{ user.shared }}</p>
      </div>
      <div class="profile-footer">
        <button @click="goToPage('ajustes')">Ajustes</button>
        <button @click="goToPage('preferencias')">Preferencias</button>
        <button @click="goToPage('incidencias')">Incidencias</button>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.profile-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.profile-header h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.profile-body {
  margin-bottom: 20px;
}

.profile-body p {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

.profile-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.profile-footer button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.profile-footer button:hover {
  background-color: #0056b3;
}
</style>

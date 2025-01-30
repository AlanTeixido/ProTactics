<script setup>
import FooterSection from '@/components/FooterSection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { ref } from 'vue';

// Datos del usuario
const user = ref({
  username: '@jimmyf1',
  name: 'Jimmy Fuentes',
  age: 19,
  trainings: 2,
  shared: 1,
  likes: 173,
  followers: 89,
  profilePicture: 'https://example.com/profile.jpg', // Reemplaza a URL real
  trainingImage: 'https://example.com/training.jpg' // Reemplaza a URL real
});
</script>

<template>
  <HeaderSection/>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="user.profilePicture" alt="Foto de perfil" class="profile-picture" />
        <h2>{{ user.username }}</h2>
        <p>{{ user.name }} - {{ user.age }}</p>
      </div>
      <div class="profile-stats">
        <p><strong>Entrenamientos:</strong> {{ user.trainings }}</p>
        <p><strong>Compartidos:</strong> {{ user.shared }}</p>
        <p><strong>Likes:</strong> {{ user.likes }}</p>
        <p><strong>Seguidores:</strong> {{ user.followers }}</p>
      </div>
      <div class="training-image">
        <img :src="user.trainingImage" alt="Entrenamiento" />
        <p>Imagen + Descripcion ...</p>
      </div>
      <div class="add-content">
        <button>+</button>
      </div>
      <div class="profile-bottom">
        <button>Editar Perfil</button>
        <button>Compartir Perfil</button>
        <button>Entrenamientos Guardados</button>
        <button>Ajustes</button>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 100px 20px 20px; 
}

.profile-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-stats p {
  font-size: 16px;
  color: #555;
  margin: 5px 0;
}

.profile-stats p:hover {
  color: #242323;
}

.training-image {
  width: 80%;
  height: 200px;
  background-color: hsla(180, 100%, 35%, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  margin: 0 auto; 
}

.training-image img {
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
}

.add-content button {
  background-color: #ddd;
  border: none;
  font-size: 24px;
  padding: 10px 20px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 30px;
}

.profile-bottom {
  margin-top: 30px;
}

.profile-bottom button {
  width: 100%;
  padding: 10px;
  background-color: hsla(180, 100%, 35%, 1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
}

.profile-bottom button:hover {
  background-color: rgb(93, 238, 238);
}
</style>

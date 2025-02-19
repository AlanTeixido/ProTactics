<template>
  <HeaderSection />
  <div class="profile-container">
    <div class="profile-card1">
      <div class="profile-header">
        <img src="../assets/img/usuario.png" class="img-profile"/>
        <h2 class="username">{{ user.username }}</h2>
        <p class="email">{{ user.email }}</p>
        <button class="profile-btn" @click="$router.push('/editar')">Editar Perfil</button>
      </div>
    </div>

    <div class="profile-card2">
      <div class="profile-stats">
        <div class="stat-box"><span>{{ user.followers }}</span><strong>Seguidores</strong></div>
        <div class="stat-box"><span>{{ user.trainings }}</span><strong>Entrenamientos</strong></div>
        <div class="stat-box"><span>{{ user.shared }}</span><strong>Compartidos</strong></div>
        <div class="stat-box"><span>{{ user.likes }}</span><strong>Likes</strong></div>
      </div>
    </div>
  </div>

  <!-- Solo cargar posts si userId está definido -->
  <Posts v-if="user.id" :userId="user.id" mode="profile"/>

  <FooterSection />
</template>

<script setup>
import FooterSection from '@/components/FooterSection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import Posts from '@/components/Posts.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref({
  id: localStorage.getItem('userId') || '',
  username: localStorage.getItem('username') || 'Usuario',
  email: localStorage.getItem('userEmail') || '',
  trainings: 0,
  shared: 0,
  likes: 0,
  followers: 0
});

// 🔹 Cargar datos del usuario desde la API
const loadUserData = async () => {
  if (!user.value.id) return;

  try {
    const response = await axios.get(`https://protactics-api.onrender.com/usuarios/${user.value.id}`);
    user.value.trainings = response.data.trainings || 0;
    user.value.shared = response.data.shared || 0;
    user.value.likes = response.data.likes || 0;
    user.value.followers = response.data.followers || 0;
  } catch (error) {
    console.error('Error cargando los datos:', error);
  }
};

// 🔹 Cargar datos al montar el componente
onMounted(loadUserData);
</script>


<style scoped>
/* Contenedor principal */
.profile-container {
  display: flex;
  justify-content: center;  
  padding: 2%;
  background-color: #222;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin: 8%;
  border-radius: 10px;
  margin-top: 15%;

}

/* Tarjeta de perfil */
.profile-card1, .profile-card2 {
  width: 45%;
  text-align: center;
  color: white;
  margin: 2%;

}

/* Foto de perfil */
.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50px 50px;
  object-fit: cover;
  margin-bottom: 10px;
}

/* Email del usuario */
.email {
  font-size: 14px;
  color: #aaa;
}

.username {
  text-transform: uppercase;
  color: white;
  font-size: 24px;
}

/* Sección de subida de imagen */
.upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

/* Botón de selección de archivo */
.file-label {
  background-color: #00c3ff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}

/* Botón de subida de imagen */
.upload-btn {
  border: 2px white solid;
  background-color: transparent;
  padding: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 80%;
}

.upload-btn:hover {
  background-color: #0072a5;
}

/* Estadísticas del perfil */
.profile-stats {
  display: flex;
  grid-template-rows: repeat(1, 1fr);
  margin-top: 15px;
  flex-wrap: wrap;
}

.stat-box {
  display: grid;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: 20%;
  margin: 5px;
  text-align: center;
}

.stat-box strong {
  display: block;
  font-weight: 400;
  font-size: 15px;
}

.stat-box span {
  font-size: 20px;
  font-weight: bold;
  color: #00c3ff;
}

/* Botones del perfil */
.profile-bottom {
  margin-top: 10px;
}
.profile-btn-share, .profile-btn-config, .profile-btn-save {
  width: 10%;
  padding: 10px;
  color: white;
  border-radius: 40px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
  transition: 0.3s;
  border: none;
  background-color: transparent;
}

.profile-btn-share:hover, .profile-btn-config:hover, .profile-btn-save:hover {
  transform: scale(1.1);
}

.img{
  width: 30px;
  height: 30px;
}

.img-profile{
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.profile-btn {
  margin-top: 20px;
  width: 50%;
  color: white;
  font-weight: 5000;
  text-decoration: none;
  background: transparent; /* Fondo transparente */
  padding: 10px 15px;
  border-radius: 10px;
  position: relative;
  transition: 0.3s;
  border: 2px solid transparent; /* Borde inicial transparente */
  background-clip: padding-box;
}

.profile-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px; /* Grosor del borde */
  border-radius: 10px;
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194)); /* Degradado en el borde */
  -webkit-mask: 
    linear-gradient(white 0 0) content-box, 
    linear-gradient(white 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>

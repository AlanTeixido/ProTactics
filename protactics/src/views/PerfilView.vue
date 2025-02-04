<script setup>
import FooterSection from '@/components/FooterSection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Datos del usuario
const user = ref({
  id: localStorage.getItem('userId') || '',
  username: localStorage.getItem('username') || 'Usuario',
  email: localStorage.getItem('userEmail') || '',
  profilePicture: localStorage.getItem('fotoUrl') || 'https://via.placeholder.com/150',
  trainings: 0,
  shared: 0,
  likes: 0,
  followers: 0
});

const selectedFile = ref(null);

// Cargar datos del usuario desde la API
const loadUserData = async () => {
  try {
    const response = await axios.get(`https://protactics-api.onrender.com/usuarios/${user.value.id}`);
    user.value.trainings = response.data.trainings || 0;
    user.value.shared = response.data.shared || 0;
    user.value.likes = response.data.likes || 0;
    user.value.followers = response.data.followers || 0;
    if (response.data.foto_url) {
      user.value.profilePicture = response.data.foto_url;
      localStorage.setItem('fotoUrl', response.data.foto_url);
    }
  } catch (error) {
    console.error('Error cargando los datos:', error);
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  loadUserData();
});

// Manejar selección de imagen
const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

// Subir la nueva foto de perfil
const uploadPhoto = async () => {
  if (!selectedFile.value) {
    alert("Selecciona una imagen primero");
    return;
  }

  const formData = new FormData();
  formData.append('foto', selectedFile.value);
  formData.append('id', user.value.id);

  try {
    const response = await axios.post('https://protactics-api.onrender.com/auth/upload-profile-pic', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    user.value.profilePicture = response.data.foto_url;
    localStorage.setItem('fotoUrl', response.data.foto_url);

    alert("Foto de perfil actualizada");
  } catch (error) {
    console.error("Error al subir la foto:", error);
    alert("Error al subir la imagen.");
  }
};
</script>

<template>
  <HeaderSection />
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="user.profilePicture" alt="Foto de perfil" class="profile-picture" />
        <h2>{{ user.username }}</h2>
        <p class="email">{{ user.email }}</p>
      </div>

      <div class="upload-section">
        <label class="file-label">
          Seleccionar Imagen
          <input type="file" @change="handleFileUpload" class="file-input" />
        </label>
        <button @click="uploadPhoto" class="upload-btn">Cambiar Foto</button>
      </div>

      <div class="profile-stats">
        <div class="stat-box"><strong>Entrenamientos</strong><span>{{ user.trainings }}</span></div>
        <div class="stat-box"><strong>Compartidos</strong><span>{{ user.shared }}</span></div>
        <div class="stat-box"><strong>Likes</strong><span>{{ user.likes }}</span></div>
        <div class="stat-box"><strong>Seguidores</strong><span>{{ user.followers }}</span></div>
      </div>

      <div class="profile-bottom">
        <button class="profile-btn">Editar Perfil</button>
        <button class="profile-btn">Compartir Perfil</button>
        <button class="profile-btn">Entrenamientos Guardados</button>
        <button class="profile-btn">Ajustes</button>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped>
/* Contenedor principal */
.profile-container {
  display: flex;
  justify-content: center;
  padding: 120px 20px 50px;
}

/* Tarjeta de perfil */
.profile-card {
  background-color: #222;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
  text-align: center;
  color: white;
}

/* Foto de perfil */
.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00c3ff;
  margin-bottom: 10px;
}

/* Email del usuario */
.email {
  font-size: 14px;
  color: #aaa;
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
  background-color: #0084c2;
  border: none;
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
  justify-content: space-around;
  margin-top: 15px;
  flex-wrap: wrap;
}

.stat-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: 45%;
  margin: 5px 0;
  text-align: center;
}

.stat-box strong {
  display: block;
  font-size: 14px;
}

.stat-box span {
  font-size: 16px;
  font-weight: bold;
  color: #00c3ff;
}

/* Botones del perfil */
.profile-bottom {
  margin-top: 20px;
}

.profile-btn {
  width: 90%;
  padding: 10px;
  background-color: #00c3ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
}

.profile-btn:hover {
  background-color: #0084c2;
}
</style>

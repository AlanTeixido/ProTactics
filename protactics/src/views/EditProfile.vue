<script setup>
import FooterSection from "@/components/FooterSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const errorMessage = ref("");
const successMessage = ref("");

// Datos del usuario
const user = ref({
  id: localStorage.getItem("userId") || "",
  username: "",
  email: "",
  profileImage: "",
});

// Contraseñas
const passwords = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Imagen de perfil
const selectedFile = ref(null);

// 🔹 Cargar datos del usuario
const loadUserData = async () => {
  if (!user.value.id) return;

  try {
    const authToken = localStorage.getItem("authToken");

    const response = await axios.get(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    user.value.username = response.data.nombre_usuario || "Usuario";
    user.value.email = response.data.correo || "";
    user.value.profileImage = response.data.profile_image || "default.png";
  } catch (error) {
    console.error("⚠️ Error cargando datos:", error);
  }
};

// 🔹 Guardar datos generales
const saveProfile = async () => {
  if (!user.value.username.trim() || !user.value.email.trim()) {
    errorMessage.value = "❌ Todos los campos son obligatorios.";
    return;
  }

  try {
    const authToken = localStorage.getItem("authToken");

    await axios.put(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}`,
      {
        nombre_usuario: user.value.username,
        correo: user.value.email,
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    successMessage.value = "✅ Perfil actualizado correctamente!";
    setTimeout(() => router.push("/perfil"), 1500);
  } catch (error) {
    errorMessage.value = "❌ No se pudo actualizar el perfil.";
  }
};

// 🔹 Cambiar contraseña
const changePassword = async () => {
  if (
    !passwords.value.oldPassword ||
    !passwords.value.newPassword ||
    !passwords.value.confirmPassword
  ) {
    errorMessage.value = "❌ Todos los campos son obligatorios.";
    return;
  }

  if (passwords.value.newPassword !== passwords.value.confirmPassword) {
    errorMessage.value = "❌ Las nuevas contraseñas no coinciden.";
    return;
  }

  try {
    const authToken = localStorage.getItem("authToken");

    await axios.put(
      `https://protactics-api.onrender.com/edituser/${user.value.id}/password`,
      {
        contrasena_actual: passwords.value.oldPassword,
        contrasena_nova: passwords.value.newPassword,
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );

    successMessage.value = "✅ Contraseña actualizada!";
    passwords.value.oldPassword = "";
    passwords.value.newPassword = "";
    passwords.value.confirmPassword = "";

    setTimeout(() => router.push("/perfil"), 1500);
  } catch (error) {
    errorMessage.value = "❌ Error cambiando la contraseña.";
  }
};

// 🔹 Cambiar foto de perfil
const uploadProfilePicture = async () => {
  if (!selectedFile.value) {
    errorMessage.value = "❌ Selecciona una imagen.";
    return;
  }

  const formData = new FormData();
  formData.append("profileImage", selectedFile.value);

  try {
    const authToken = localStorage.getItem("authToken");

    const response = await axios.post(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}/profile-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    successMessage.value = "✅ Foto de perfil actualizada!";
    user.value.profileImage = response.data.profileImage;
    setTimeout(loadUserData, 1500);
  } catch (error) {
    errorMessage.value = "❌ Error cambiando la foto de perfil.";
  }
};

// 🔄 Función para recargar la página
const reloadPage = () => {
  setTimeout(() => {
    location.reload();
  }, 1500);
};

// Cargar datos al montar la página
onMounted(loadUserData);
</script>

<template>
  <HeaderSection />
  <div class="profile-container">
    <div class="profile-image-section">
      <!-- <img :src="`/uploads/${user.profileImage}`" alt="Foto de perfil" class="profile-image" /> -->
      <img src="../assets/img/futbol.jpg" class="profile-image"/>
      <label class="file-label">
        Cambiar Imagen
        <input type="file" @change="(event) => (selectedFile = event.target.files[0])" class="file-input" />
      </label>
      <button @click="uploadProfilePicture" class="upload-btn">
        Actualizar Imagen
      </button>
    </div>

    <div class="profile-edit-section">
      <h2>Editar Perfil</h2>

      <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>

      <div class="input-group">
        <label>Usuario</label>
        <input v-model="user.username" type="text" placeholder="Usuario" />

        <label>Correo Electrónico</label>
        <input v-model="user.email" type="email" placeholder="Correo electrónico" />

        <button @click="saveProfile" class="save-btn">Guardar Cambios</button>
      </div>

      <div class="password-group">
        <h3>Cambiar Contraseña</h3>
        <input v-model="passwords.oldPassword" type="password" placeholder="Contraseña actual" />
        <input v-model="passwords.newPassword" type="password" placeholder="Nueva contraseña" />
        <input v-model="passwords.confirmPassword" type="password" placeholder="Confirmar nueva contraseña" />
        <button @click="changePassword" class="save-btn">Actualizar Contraseña</button>
      </div>

      <button @click="router.push('/perfil')" class="cancel-btn">
        Cancelar
      </button>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped>
/* Estilos para la página de perfil */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.profile-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.input-group,
.password-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin-top: 30px;
}

input {
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #0072a5;
  outline: none;
  background-color: #fff;
}

button {
  padding: 15px;
  border-radius: 8px;
  background: #333;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #555;
}

.cancel-btn {
  background: #e74c3c;
  margin-top: 20px;
}

.save-btn {
  background: #0072a5;
  margin-top: 20px;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  text-align: center;
}

.success-msg {
  color: green;
  font-size: 0.9rem;
  text-align: center;
}

.file-label {
  font-size: 0.9rem;
  color: #0072a5;
  cursor: pointer;
}

.file-input{
  background-color: transparent;
  border: none;
}

.upload-btn {
  padding: 10px;
  border-radius: 8px;
  background-color: #0072a5;
  color: white;
  border: none;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #005f85;
}
</style>

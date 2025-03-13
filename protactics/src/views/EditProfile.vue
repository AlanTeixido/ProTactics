<script setup>
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
  followingCount: 0, // Variable per a la quantitat de seguidors
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

    // Obtenim les dades generals de l'usuari
    const response = await axios.get(
      `https://protactics-api.onrender.com/usuarios/${user.value.id}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    user.value.username = response.data.nombre_usuario || "Usuario";
    user.value.email = response.data.correo || "";
    user.value.profileImage = response.data.profile_image || "default.png";

    // Ara obtenim el nombre d'usuaris que segueixes
    const followingResponse = await axios.get(
      `https://protactics-api.onrender.com/seguimientos/${user.value.id}/seguidos`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    user.value.followingCount = followingResponse.data.length; // Actualitzem el compte de seguidors
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
      `https://protactics-api.onrender.com/password`,  // ✅ RUTA CORRECTA
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
    errorMessage.value = error.response?.data?.error || "❌ Error cambiando la contraseña.";
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
  <div class="profile-container">
    <div class="profile-image-section">
      <img src="../assets/img/futbol.jpg" class="profile-image" />

      <!-- Esta es la parte de cambio de imagen -->
      <label class="file-label" for="file-input">
        Cambiar Imagen
      </label>
      <input id="file-input" type="file" ref="fileInput" @change="(event) => selectedFile.value = event.target.files[0]"
        class="file-input" style="display: none;" />

      <button @click="uploadProfilePicture" class="upload-btn">
        Actualizar Imagen
      </button>
    </div>

    <div class="profile-edit-section">
      <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>

      <div class="input-group">
        <div class="input-row">
          <label for="username">Usuario</label>
          <input id="username" v-model="user.username" type="text" placeholder="Usuario" />
        </div>

        <div class="input-row">
          <label for="email">Correo Electrónico</label>
          <input id="email" v-model="user.email" type="email" placeholder="Correo electrónico" />
        </div>

        <div class="input-row">
          <label>Sigues a: </label>
          <span>{{ user.followingCount }} personas</span> <!-- Mostrem la quantitat de persones que segueixes -->
        </div>

        <button @click="saveProfile" class="save-btn">Guardar Cambios</button>

        <div class="password-container">
          <div class="input-row">
            <label for="oldPassword">Contraseña actual</label>
            <input id="oldPassword" v-model="passwords.oldPassword" type="password" placeholder="Contraseña actual" />
          </div>
          <div class="input-row">
            <label for="newPassword">Nueva contraseña</label>
            <input id="newPassword" v-model="passwords.newPassword" type="password" placeholder="Nueva contraseña" />
          </div>
          <div class="input-row">
            <label for="confirmPassword">Confirmar nueva contraseña</label>
            <input id="confirmPassword" v-model="passwords.confirmPassword" type="password" placeholder="Confirmar nueva contraseña" />
          </div>
        </div>

        <button @click="changePassword" class="save-btn">Actualizar Contraseña</button>
        <button @click="router.push('/perfil')" class="cancel-btn">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estils per al perfil */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  padding-top: 5%;
  padding-bottom: 5%;
}

.profile-edit-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  width: 50%;
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

.input-group {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.password-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 5%;
}

.input-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: 450;
  color: rgb(73, 73, 73);
  width: 40%;
}

input {
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgba(73, 73, 73, 0.267);
  background-color: transparent;
  color: #8b8b8b;
  font-size: 1rem;
  width: 55%;
}

input:focus {
  outline: none;
  border-bottom: 2px solid rgb(73, 73, 73);
}

button {
  padding: 15px;
  border-radius: 8px;
  background: #333;
  color: rgb(73, 73, 73);
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #55555534;
}

.cancel-btn {
  background: transparent;
  border: 2px red solid;
  margin-top: 20px;
  color: red;
}
.cancel-btn:hover {
  background: rgba(255, 0, 0, 0.288);
}

.save-btn {
  background: transparent;
  border: 2px rgb(73, 73, 73) solid;
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

.file-input {
  background-color: transparent;
  border: none;
  display: none;
}

.upload-btn {
  padding: 10px;
  border-radius: 8px;
  background-color: transparent;
  color: rgb(73, 73, 73);
  border: 2px solid rgb(73, 73, 73);
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
}

</style>

<script setup>
import FooterSection from "@/components/FooterSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const errorMessage = ref("");
const successMessage = ref("");

// Dades de l'usuari
const user = ref({
  id: localStorage.getItem("userId") || "",
  username: "",
  email: "",
  profileImage: "",
});

// Contrasenyes
const passwords = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Imatge de perfil
const selectedFile = ref(null);

// 🔹 Carregar dades de l'usuari
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

    user.value.username = response.data.nombre_usuario || "Usuari";
    user.value.email = response.data.correo || "";
    user.value.profileImage = response.data.profile_image || "default.png";
  } catch (error) {
    console.error("⚠️ Error carregant dades:", error);
  }
};

// 🔹 Guardar dades generals
const saveProfile = async () => {
  if (!user.value.username.trim() || !user.value.email.trim()) {
    errorMessage.value = "❌ Tots els camps són obligatoris.";
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

    successMessage.value = "✅ Perfil actualitzat correctament!";
    setTimeout(() => router.push("/perfil"), 1500);
  } catch (error) {
    errorMessage.value = "❌ No s'ha pogut actualitzar el perfil.";
  }
};

// 🔹 Canviar contrasenya
const changePassword = async () => {
  if (
    !passwords.value.oldPassword ||
    !passwords.value.newPassword ||
    !passwords.value.confirmPassword
  ) {
    errorMessage.value = "❌ Tots els camps són obligatoris.";
    return;
  }

  if (passwords.value.newPassword !== passwords.value.confirmPassword) {
    errorMessage.value = "❌ Les noves contrasenyes no coincideixen.";
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

    successMessage.value = "✅ Contrasenya actualitzada!";
    passwords.value.oldPassword = "";
    passwords.value.newPassword = "";
    passwords.value.confirmPassword = "";

    setTimeout(() => router.push("/perfil"), 1500);
  } catch (error) {
    errorMessage.value = "❌ Error canviant la contrasenya.";
  }
};

// 🔹 Canviar foto de perfil
const uploadProfilePicture = async () => {
  if (!selectedFile.value) {
    errorMessage.value = "❌ Selecciona una imatge.";
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

    successMessage.value = "✅ Foto de perfil actualitzada!";
    user.value.profileImage = response.data.profileImage;
    setTimeout(loadUserData, 1500);
  } catch (error) {
    errorMessage.value = "❌ Error canviant la foto de perfil.";
  }
};

// 🔄 Funció per recarregar la pàgina
const reloadPage = () => {
  setTimeout(() => {
    location.reload();
  }, 1500);
};

// Carrega dades en muntar la pàgina
onMounted(loadUserData);
</script>

<template>
  <HeaderSection />
  <div class="edit-profile-container">
    <div class="edit-left">
      <img
        :src="`/uploads/${user.profileImage}`"
        alt="Foto de perfil"
        class="profile-image"
      />
      <label class="file-label">
        Seleccionar imatge
        <input
          type="file"
          @change="(event) => (selectedFile = event.target.files[0])"
          class="file-input"
        />
      </label>
      <button @click="uploadProfilePicture" class="upload-btn">
        Pujar Imatge
      </button>
    </div>

    <div class="edit-right">
      <h2>Editar Perfil</h2>

      <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>

      <div class="form-group">
        <label>Nom d'usuari</label>
        <input v-model="user.username" type="text" placeholder="Nom d'usuari" />

        <label>Correu electrònic</label>
        <input
          v-model="user.email"
          type="email"
          placeholder="Correu electrònic"
        />

        <button @click="saveProfile">Guardar Canvis</button>
      </div>

      <div class="password-group">
        <h3>Canviar Contrasenya</h3>
        <input
          v-model="passwords.oldPassword"
          type="password"
          placeholder="Contrasenya actual"
        />
        <input
          v-model="passwords.newPassword"
          type="password"
          placeholder="Nova contrasenya"
        />
        <input
          v-model="passwords.confirmPassword"
          type="password"
          placeholder="Confirma la nova contrasenya"
        />
        <button @click="changePassword">Canviar Contrasenya</button>
      </div>

      <button @click="router.push('/perfil')" class="cancel-btn">
        Cancel·lar
      </button>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped>
.edit-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  margin: 120px auto;
  background: #222;
  color: white;
  border-radius: 15px;
  box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.3);
  max-width: 1000px;
  gap: 40px;
}

.edit-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
}

.form-group,
.password-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 6px;
  border: 2px solid #555;
  background-color: #333;
  color: white;
  font-size: 1rem;
}

button {
  padding: 14px;
  border-radius: 8px;
  color: white;
  background: #0072a5;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  background: #005f85;
}

.cancel-btn {
  background: red;
}

.error-msg {
  color: red;
}

.success-msg {
  color: lightgreen;
}
</style>

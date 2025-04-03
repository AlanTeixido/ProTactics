<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const errorMessage = ref('');
const successMessage = ref('');

const user = ref({
  id: localStorage.getItem('userId') || '',
  nombre: '',
  correo: '',
  ubicacion: '', // solo para club
  equipo: '',     // solo para entrenador
  rol: localStorage.getItem('userRol') || '',
});

const passwords = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const loadUserData = async () => {
  if (!user.value.id || !user.value.rol) return;
  try {
    const token = localStorage.getItem('authToken');
    const endpoint =
      user.value.rol === 'entrenador'
        ? `https://protactics-api.onrender.com/entrenadores/${user.value.id}`
        : `https://protactics-api.onrender.com/clubs/${user.value.id}`;

    const { data } = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value.nombre = data.nombre || '';
    user.value.correo = data.correo || '';
    if (user.value.rol === 'club') user.value.ubicacion = data.ubicacion || '';
    if (user.value.rol === 'entrenador') user.value.equipo = data.equipo || '';
  } catch (error) {
    console.error('⚠️ Error cargando datos:', error);
  }
};

const saveProfile = async () => {
  if (!user.value.nombre.trim() || !user.value.correo.trim()) {
    errorMessage.value = '❌ Todos los campos son obligatorios.';
    return;
  }

  try {
    const token = localStorage.getItem('authToken');
    const endpoint =
      user.value.rol === 'entrenador'
        ? `https://protactics-api.onrender.com/entrenadores/${user.value.id}`
        : `https://protactics-api.onrender.com/clubs/${user.value.id}`;

    const payload = {
      nombre: user.value.nombre,
      correo: user.value.correo,
    };
    if (user.value.rol === 'club') payload.ubicacion = user.value.ubicacion;
    if (user.value.rol === 'entrenador') payload.equipo = user.value.equipo;

    await axios.put(endpoint, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    successMessage.value = '✅ Perfil actualizado correctamente!';
    setTimeout(() => router.push('/perfil'), 1500);
  } catch (error) {
    errorMessage.value = '❌ No se pudo actualizar el perfil.';
  }
};

const changePassword = async () => {
  const { oldPassword, newPassword, confirmPassword } = passwords.value;
  if (!oldPassword || !newPassword || !confirmPassword) {
    errorMessage.value = '❌ Todos los campos son obligatorios.';
    return;
  }
  if (newPassword !== confirmPassword) {
    errorMessage.value = '❌ Las nuevas contraseñas no coinciden.';
    return;
  }

  try {
    const token = localStorage.getItem('authToken');
    const endpoint =
      user.value.rol === 'entrenador'
        ? `https://protactics-api.onrender.com/entrenadores/${user.value.id}/password`
        : `https://protactics-api.onrender.com/clubs/${user.value.id}/password`;

    await axios.put(
      endpoint,
      {
        contrasena_actual: oldPassword,
        contrasena_nova: newPassword,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    successMessage.value = '✅ Contraseña actualizada!';
    passwords.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
    setTimeout(() => router.push('/perfil'), 1500);
  } catch (error) {
    errorMessage.value = error.response?.data?.error || '❌ Error cambiando la contraseña.';
  }
};

onMounted(loadUserData);
</script>

<template>
  <div class="profile-container">
    <div class="profile-edit-section">
      <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>

      <div class="input-group">
        <div class="input-row">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="user.nombre" type="text" placeholder="Nombre completo" />
        </div>

        <div class="input-row">
          <label for="correo">Correo Electrónico</label>
          <input id="correo" v-model="user.correo" type="email" placeholder="Correo electrónico" />
        </div>

        <div v-if="user.rol === 'club'" class="input-row">
          <label for="ubicacion">Ubicación</label>
          <input id="ubicacion" v-model="user.ubicacion" type="text" placeholder="Ubicación del club" />
        </div>

        <div v-if="user.rol === 'entrenador'" class="input-row">
          <label for="equipo">Equipo</label>
          <input id="equipo" v-model="user.equipo" type="text" placeholder="Equipo asignado" />
        </div>

        <button @click="saveProfile" class="save-btn">Guardar Cambios</button>

        <div class="password-container">
          <div class="input-row">
            <label for="oldPassword">Contraseña actual</label>
            <input id="oldPassword" v-model="passwords.oldPassword" type="password" />
          </div>
          <div class="input-row">
            <label for="newPassword">Nueva contraseña</label>
            <input id="newPassword" v-model="passwords.newPassword" type="password" />
          </div>
          <div class="input-row">
            <label for="confirmPassword">Confirmar nueva contraseña</label>
            <input id="confirmPassword" v-model="passwords.confirmPassword" type="password" />
          </div>
        </div>

        <button @click="changePassword" class="save-btn">Actualizar Contraseña</button>
        <button @click="router.push('/perfil')" class="cancel-btn">Cancelar</button>
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

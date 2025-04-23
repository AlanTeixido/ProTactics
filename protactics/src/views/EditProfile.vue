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
body {
  margin: 0;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0; /* 💡 margen arriba y abajo */
  min-height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.profile-edit-section {
  background-color: #1e293b;
  padding: 40px 50px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  width: 600px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.input-row {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  color: #cbd5e1;
  margin-bottom: 8px;
}

input {
  padding: 12px;
  border-radius: 8px;
  background-color: #0f172a;
  border: 1px solid #334155;
  color: #e2e8f0;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #22d3ee;
}

button {
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.save-btn {
  background-color: transparent;
  border: 2px solid #22d3ee;
}

.save-btn:hover {
  background-color: #22d3ee22;
}

.cancel-btn {
  background-color: transparent;
  border: 2px solid #ef4444;
  color: #ef4444;
}

.cancel-btn:hover {
  background-color: #ef444422;
}

.error-msg,
.success-msg {
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.error-msg {
  color: #f87171;
}

.success-msg {
  color: #4ade80;
}

.password-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
}
</style>


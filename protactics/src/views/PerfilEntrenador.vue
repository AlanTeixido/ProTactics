<template>
  <div class="perfil-entrenador dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
      <h2 class="titulo">Perfil del Entrenador</h2>
      <div class="rol-badge">Accediendo como <strong>Entrenador</strong></div>

      <div class="info-card" v-if="!editando">
        <img class="profile-img" :src="entrenador.foto_url || '/img/default-profile.png'" alt="Foto del entrenador" />

        <div class="info-row">
          <span class="label">Nombre:</span>
          <span class="value">{{ entrenador.nombre || 'No especificado' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Correo electrónico:</span>
          <span class="value">{{ entrenador.correo || 'No especificado' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Teléfono:</span>
          <span class="value">{{ entrenador.telefono || 'No especificado' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Notas adicionales:</span>
          <span class="value">{{ entrenador.notas || 'Ninguna' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Fecha de registro:</span>
          <span class="value">
            {{
              entrenador.creado_en
                ? new Date(entrenador.creado_en).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })
                : 'No especificada'
            }}
          </span>
        </div>

        <button class="btn-editar" @click="empezarEdicion">Editar perfil</button>
      </div>

      <div v-else class="info-card editar">
        <div class="input-group">
          <label>Nombre:</label>
          <input v-model="entrenadorEdit.nombre" />
        </div>

        <div class="input-group">
          <label>Correo electrónico:</label>
          <input v-model="entrenadorEdit.correo" type="email" />
        </div>

        <div class="input-group">
          <label>Nueva contraseña (opcional):</label>
          <input v-model="entrenadorEdit.password" type="password" />
        </div>

        <div class="input-group">
          <label>Teléfono:</label>
          <input v-model="entrenadorEdit.telefono" type="tel" />
        </div>

        <div class="input-group">
          <label>Foto de perfil (URL):</label>
          <input v-model="entrenadorEdit.foto_url" type="url" />
        </div>

        <div class="input-group">
          <label>Notas:</label>
          <textarea v-model="entrenadorEdit.notas" rows="3"></textarea>
        </div>

        <div class="botones">
          <button @click="guardarCambios">Guardar cambios</button>
          <button @click="cancelarEdicion">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const router = useRouter();

const entrenador = ref({});
const entrenadorEdit = ref({});
const editando = ref(false);

const token = localStorage.getItem('authToken');
const rol = localStorage.getItem('userRol');
let entrenadorId = null;

if (rol !== 'entrenador' || !token) {
  router.push('/login');
}

const cargarEntrenador = async () => {
  try {
    const res = await axios.get(`https://protactics-api.onrender.com/entrenadores/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    entrenador.value = res.data;
    entrenadorId = res.data.entrenador_id;
  } catch (error) {
    console.error('❌ Error al cargar perfil del entrenador:', error);
  }
};


const empezarEdicion = () => {
  entrenadorEdit.value = { ...entrenador.value };
  editando.value = true;
};

const cancelarEdicion = () => {
  editando.value = false;
};

const guardarCambios = async () => {
  if (!entrenadorEdit.value.nombre.trim() || !entrenadorEdit.value.correo.trim()) {
    alert('❌ Nombre y correo son obligatorios.');
    return;
  }

  const payload = { ...entrenadorEdit.value };
  if (!payload.password) {
    delete payload.password;
  }

  try {
    await axios.put(`https://protactics-api.onrender.com/entrenadores/${entrenadorId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    entrenador.value = { ...entrenadorEdit.value };
    editando.value = false;
    alert('✅ Perfil actualizado correctamente.');
  } catch (error) {
    console.error('❌ Error al actualizar perfil:', error);
    alert('❌ Hubo un problema al actualizar el perfil.');
  }
};

onMounted(cargarEntrenador);
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  background-color: #1f2937;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-container {
  flex: 1;
  margin-left: 250px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
}

.rol-badge {
  background-color: #334155;
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 0.95rem;
  width: fit-content;
  color: #e2e8f0;
}

.info-card {
  background-color: #1e293b;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  position: relative;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #334155;
}

.label {
  font-weight: bold;
  color: #94a3b8;
}

.value {
  color: #e2e8f0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.input-group input,
.input-group textarea {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #334155;
  color: white;
}

.botones {
  display: flex;
  gap: 15px;
}

.btn-editar,
.botones button {
  background-color: #0ea5e9;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.botones button:nth-child(2) {
  background-color: #ef4444;
}

.btn-editar:hover,
.botones button:hover {
  opacity: 0.9;
}

.profile-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #22d3ee;
  margin: 0 auto 20px;
}
</style>

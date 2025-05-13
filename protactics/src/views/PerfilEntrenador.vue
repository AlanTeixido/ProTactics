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
          <div class="info-row">
            <span class="label">Nombre</span>
            <span class="value">{{ entrenador.nombre }}</span>
          </div>
          <div class="info-row">
            <span class="label">Correo electrónico</span>
            <span class="value">{{ entrenador.correo }}</span>
          </div>
          <div class="info-row">
            <span class="label">Teléfono</span>
            <span class="value">{{ entrenador.telefono || 'No especificado' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Notas adicionales</span>
            <span class="value">{{ entrenador.notas || 'Ninguna' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Equipo asignado</span>
            <span class="value">{{ entrenador.equipo || 'No asignado' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Fecha de registro</span>
            <span class="value">{{ new Date(entrenador.creado_en).toLocaleDateString() }}</span>
          </div>
  
          <button class="btn-editar" @click="empezarEdicion">Editar perfil</button>
        </div>
  
        <div v-else class="info-card editar">
          <div class="input-group">
            <label>Nombre</label>
            <input v-model="entrenadorEdit.nombre" />
          </div>
  
          <div class="input-group">
            <label>Correo electrónico</label>
            <input v-model="entrenadorEdit.correo" type="email" />
          </div>
  
          <div class="input-group">
            <label>Nueva contraseña (opcional)</label>
            <input v-model="entrenadorEdit.password" type="password" />
          </div>
  
          <div class="input-group">
            <label>Teléfono</label>
            <input v-model="entrenadorEdit.telefono" type="tel" placeholder="Ej: 612345678" />
          </div>
  
          <div class="input-group">
            <label>Foto de perfil (URL)</label>
            <input v-model="entrenadorEdit.foto_url" type="url" placeholder="https://..." />
          </div>
  
          <div class="input-group">
            <label>Notas</label>
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
  import MenuDashboard from '@/components/MenuDashboard.vue';
  import ButtonAtras from '@/components/botones/ButtonAtras.vue';
  
  const entrenador = ref({});
  const entrenadorEdit = ref({});
  const editando = ref(false);
  
  const entrenadorId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");
  
  const cargarEntrenador = async () => {
    try {
      const res = await axios.get(`https://protactics-api.onrender.com/entrenadores/${entrenadorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      entrenador.value = res.data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
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
    try {
      await axios.put(`https://protactics-api.onrender.com/entrenadores/${entrenadorId}`, entrenadorEdit.value, {
        headers: { Authorization: `Bearer ${token}` }
      });
      entrenador.value = { ...entrenadorEdit.value };
      editando.value = false;
      alert('✅ Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('❌ Hubo un problema al actualizar el perfil.');
    }
  };
  
  onMounted(cargarEntrenador);
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    height: 100vh;
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
    padding: 40px;
    border-radius: 15px;
    position: relative;
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 20px ;
    border-bottom: 1px solid #ffffff5d;
  }
  
  .label {
    font-weight: bold;
    color: #94a3b8;
    text-transform: uppercase;
  }
  
  .value {
    color: #e2e8f0;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
    text-transform: uppercase;
  }
  
  .input-group input {
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
  
  .btn-editar, .botones button {
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 2%;
    text-transform: uppercase;
    background: linear-gradient(45deg, #4caf50, #0a74da);
  }
  
  .botones button:nth-child(2) {
    background-color: #ef4444;
  }
  
  .btn-editar:hover, .botones button:hover {
    opacity: 0.9;
  }

  textarea {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #334155;
    color: white;
  }
  </style>
  
<template>
    <div class="perfil-entrenador dashboard">
      <div class="dashboard-menu">
        <MenuDashboard />
      </div>
  
      <div class="dashboard-container">
        <ButtonAtras />
        <h2 class="titulo">Perfil del Entrenador</h2>
        <div class="rol-badge">Accediendo como <strong>Entrenador</strong></div>
  
        <div class="info-card">
          <div class="info-row">
            <span class="label">Nombre:</span>
            <span class="value">{{ entrenador.nombre }}</span>
          </div>
          <div class="info-row">
            <span class="label">Correo electrónico:</span>
            <span class="value">{{ entrenador.correo }}</span>
          </div>
          <div class="info-row">
            <span class="label">Equipo asignado:</span>
            <span class="value">{{ entrenador.equipo || 'No asignado' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Fecha de registro:</span>
            <span class="value">{{ new Date(entrenador.creado_en).toLocaleDateString() }}</span>
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
  
  onMounted(async () => {
    const entrenadorId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`https://protactics-api.onrender.com/entrenadores/${entrenadorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    entrenador.value = response.data;
  });
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
    background-color: #1e293b;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
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
  </style>
  
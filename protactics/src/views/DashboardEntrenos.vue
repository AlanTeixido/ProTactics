<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <div class="header-entrenos">
        <h2 class="titulo">Gestión de entrenamientos</h2>
        <RouterLink to="/crear-entreno" class="btn-crear-entreno">➕ Crear Entreno</RouterLink>
      </div>

      <div v-if="entrenos.length === 0" class="empty-msg">
        Todavía no has creado entrenamientos.
      </div>

      <ul class="entrenos-lista">
        <li v-for="entreno in entrenos" :key="entreno.entrenamiento_id" class="entreno-card">
          <div class="entreno-info">
            <h3 class="entreno-titulo">{{ entreno.titulo }}</h3>
            <p class="entreno-descripcion">{{ entreno.descripcion }}</p>
            <p><strong>Categoría:</strong> {{ entreno.categoria || 'No definida' }}</p>
            <p><strong>Campo:</strong> {{ entreno.campo }}</p>
            <p><strong>Fecha:</strong> {{ new Date(entreno.fecha_entrenamiento).toLocaleDateString() }}</p>
            <p><strong>Duración:</strong> {{ entreno.duracion_repeticion }}</p>
            <p><strong>Repeticiones:</strong> {{ entreno.repeticiones }}</p>
            <p><strong>Descanso:</strong> {{ entreno.descanso }} minutos</p>
            <p><strong>Valoración:</strong> {{ entreno.valoracion || 'No disponible' }}</p>
            <img v-if="entreno.imagen_url" :src="entreno.imagen_url" alt="Imagen del entrenamiento" class="entreno-imagen" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import { RouterLink } from 'vue-router';

const entrenos = ref([]);

// Cargar los entrenamientos
const cargarEntrenamientos = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('https://protactics-api.onrender.com/entrenamientos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    entrenos.value = response.data || [];
  } catch (error) {
    console.error('❌ Error cargando entrenamientos:', error);
  }
};

onMounted(cargarEntrenamientos);
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

.header-entrenos {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titulo {
  font-size: 2rem;
  font-weight: bold;
}

.btn-crear-entreno {
  background-color: #22c55e;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.3s;
}

.btn-crear-entreno:hover {
  background-color: #16a34a;
}

.empty-msg {
  color: #cbd5e1;
  font-style: italic;
}

.entrenos-lista {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.entreno-card {
  background-color: #1e293b;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
  transition: transform 0.3s;
}

.entreno-card:hover {
  transform: scale(1.05);
}

.entreno-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.entreno-titulo {
  font-size: 1.6rem;
  font-weight: bold;
}

.entreno-descripcion {
  font-size: 1.1rem;
  color: #cbd5e1;
}

.entreno-imagen {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.entreno-info p {
  font-size: 1rem;
  color: #e2e8f0;
}

.entreno-info p strong {
  color: #22c55e;
}
</style>

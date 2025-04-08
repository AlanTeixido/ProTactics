<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
      <div class="dashboard-header">
        <h2 class="titulo">Gestión de entrenamientos</h2>
        <RouterLink to="/crear-entreno" class="btn-crear-entreno">➕ Crear Entreno</RouterLink>
      </div>

      <div class="dashboard-stats">
        <div class="stat-circle">
          <div class="circle-container">
            <ProgressCircle :value="entrenos.length" :max="10" color="#00c6ff">
              <span>{{ entrenos.length }}/10</span>
            </ProgressCircle>
          </div>
          <div class="circle-label">Entrenamientos</div>
        </div>        
        <div class="stat-circle">
          <ProgressCircle :value="parseInt(duracionMediaValor)" :max="60" color="#00f2c3">
            {{ duracionMediaValor }}m
          </ProgressCircle>
          <p>Duración media</p>
        </div>
        <div class="stat-circle">
          <ProgressCircle :value="totalRepeticiones" :max="20" color="#f77062">
            {{ totalRepeticiones }}
          </ProgressCircle>
          <p>Repeticiones</p>
        </div>
      </div>
      

      <div v-if="entrenos.length === 0" class="empty-msg">
        Todavía no has creado entrenamientos.
      </div>

      <ul class="entrenos-lista">
        <li v-for="entreno in entrenos" :key="entreno.entrenamiento_id" class="entreno-card">
          <img v-if="entreno.imagen_url" :src="entreno.imagen_url" alt="Imagen" class="entreno-imagen"/>
          <div class="entreno-info">
            <h3 class="entreno-titulo">{{ entreno.titulo }}</h3>
            <p>{{ entreno.descripcion }}</p>
            <div class="entreno-datos">
              <span><strong>Categoría:</strong> {{ entreno.categoria || 'No definida' }}</span>
              <span><strong>Campo:</strong> {{ entreno.campo }}</span>
              <span><strong>Fecha:</strong> {{ new Date(entreno.fecha_entrenamiento).toLocaleDateString() }}</span>
              <span><strong>Duración:</strong> {{ entreno.duracion_repeticion.minutes ?? entreno.duracion_repeticion }} min</span>
              <span><strong>Repeticiones:</strong> {{ entreno.repeticiones }}</span>
              <span><strong>Descanso:</strong> {{ entreno.descanso }} min</span>
              <span><strong>Valoración:</strong> {{ entreno.valoracion || 'N/A' }}</span>
            </div>
            <div class="entreno-actions">
              <button @click="iniciarEdicion(entreno)" class="btn-editar">Editar</button>
              <button @click="confirmarEliminarEntrenamiento(entreno.entrenamiento_id)" class="btn-eliminar">Eliminar</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import { RouterLink } from 'vue-router';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';
import ProgressCircle from '@/components/ProgressCircle.vue';


const entrenos = ref([]);

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

const eliminarEntrenamiento = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`https://protactics-api.onrender.com/entrenamientos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    entrenos.value = entrenos.value.filter(entreno => entreno.entrenamiento_id !== id);
  } catch (error) {
    console.error('❌ Error eliminando el entrenamiento:', error);
  }
};

const iniciarEdicion = (entreno) => {
  alert(`Editar entrenamiento: ${entreno.titulo}`);
};

const confirmarEliminarEntrenamiento = (id) => {
  if (confirm("¿Eliminar este entrenamiento?")) {
    eliminarEntrenamiento(id);
  }
};

const duracionMedia = computed(() => {
  if (!entrenos.value.length) return '0 min';
  const total = entrenos.value.reduce((acc, e) => acc + (e.duracion_repeticion?.minutes ?? 0), 0);
  return `${Math.round(total / entrenos.value.length)} min`;
});

const totalRepeticiones = computed(() => {
  return entrenos.value.reduce((acc, e) => acc + (e.repeticiones ?? 0), 0);
});

const duracionMediaValor = computed(() => {
  if (!entrenos.value.length) return 0;
  const total = entrenos.value.reduce((acc, e) => acc + (e.duracion_repeticion?.minutes ?? 0), 0);
  return Math.round(total / entrenos.value.length);
});


onMounted(cargarEntrenamientos);
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: #0f172a; /* Fondo original oscuro */
  color: white;
  font-family: 'Segoe UI', sans-serif;
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
  padding: 40px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titulo {
  font-size: 2.4rem;
  color: rgb(4, 196, 68); /* Verde neón */
  font-weight: bold;
}

.btn-crear-entreno {
  background-color: rgb(4, 196, 68);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-crear-entreno:hover {
  background-color: #0e7490;
}

.dashboard-stats {
  display: flex;
  gap: 30px;
  margin: 30px 0;
  justify-content: start;
  flex-wrap: wrap;
}

.stat-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #1e293b;
  border-radius: 16px;
  padding: 20px;
  width: 160px;
  height: 180px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  color: white;
  text-align: center;
  overflow: hidden;
}

.circle-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-label {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: white;
}



.stat-circle p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}


.stat-circle:hover {
  transform: scale(1.05);
}

.empty-msg {
  color: #94a3b8;
  font-style: italic;
}

.entrenos-lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.entreno-card {
  background-color: #1e293b;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: 0.3s;
}

.entreno-card:hover {
  transform: scale(1.03);
}

.entreno-imagen {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.entreno-info {
  padding: 20px;
}

.entreno-titulo {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: rgb(4, 196, 68);
}

.entreno-datos {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.95rem;
  color: #e2e8f0;
  margin-top: 10px;
}

.entreno-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-editar,
.btn-eliminar {
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  color: white;
}

.btn-editar {
  background-color: #10b981;
}

.btn-editar:hover {
  background-color: #059669;
}

.btn-eliminar {
  background-color: #ef4444;
}

.btn-eliminar:hover {
  background-color: #dc2626;
}

</style>

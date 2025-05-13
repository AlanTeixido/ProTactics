<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
      <div class="dashboard-header">
        <h2 class="titulo">Gestión de entrenamientos</h2>
        <RouterLink to="/crear-entreno" class="btn-crear-entreno"><img src="../assets/img/new.png" class="btn-new">
        </RouterLink>
      </div>

      <!-- <div class="dashboard-stats">
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
      </div> -->

      <div v-if="filteredEntrenos.length === 0" class="empty-msg">
        No hay entrenamientos que coincidan con la búsqueda.
      </div>

      <div>
        <RouterLink to="/todos-entrenos" class="btn-ver-todos">
          Ver todos los entrenamientos
        </RouterLink>
      </div>

      <div class="search-filter-container">
        <input v-model="searchQuery" placeholder="Buscar por título..." class="search-input" />
        <select v-model="selectedFilter" class="filter-select">
          <option value="">Sin filtro</option>
          <option value="asc">Fecha Ascendente</option>
          <option value="desc">Fecha Descendente</option>
          <option value="categoria">Por Categoría</option>
        </select>
      </div>

      <ul class="entrenos-lista">
        <li v-for="entreno in filteredEntrenos" :key="entreno.entrenamiento_id" class="entreno-card"
          @click="mostrarDetalle(entreno)">
          <div class="entreno-info">
            <h3 class="entreno-titulo">{{ entreno.titulo }}</h3>
            <p>{{ entreno.descripcion }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Popup de detalles -->
  <div v-if="entrenoSeleccionado" class="popup-overlay" @click="cerrarPopup">
    <div class="popup-content" @click.stop>
      <h3>{{ entrenoSeleccionado.titulo }}</h3>
      <p>{{ entrenoSeleccionado.descripcion }}</p>
      <div class="entreno-datos">
        <div>
          <span><strong>Categoría:</strong> {{ entrenoSeleccionado.categoria || 'No definida' }}</span>
          <span><strong>Campo:</strong> {{ entrenoSeleccionado.campo }}</span>

        </div>
        <div>
          <span><strong>Fecha:</strong> {{ new Date(entrenoSeleccionado.fecha_entrenamiento).toLocaleDateString()
          }}</span>
          <span><strong>Duración:</strong>
            {{
              typeof entrenoSeleccionado.duracion_repeticion === 'object' && entrenoSeleccionado.duracion_repeticion !==
                null
                ? entrenoSeleccionado.duracion_repeticion.minutes
                : entrenoSeleccionado.duracion_repeticion
            }} min
          </span>
        </div>

        <div>
          <span><strong>Repeticiones:</strong> {{ entrenoSeleccionado.repeticiones }}</span>
          <span><strong>Descanso:</strong> {{ entrenoSeleccionado.descanso }} min</span>

        </div>
      </div>
      <button @click="cerrarPopup" class="btn-cerrar-popup"><img src="../assets/img/cruzar.png"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import { RouterLink } from 'vue-router';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const entrenos = ref([]);
const searchQuery = ref("");
const selectedFilter = ref("");
const entrenoSeleccionado = ref(null);

// Función para mostrar el detalle del entrenamiento
const mostrarDetalle = (entreno) => {
  entrenoSeleccionado.value = entreno;
};

// Función para cerrar el popup
const cerrarPopup = () => {
  entrenoSeleccionado.value = null;
};

const duracionMediaValor = computed(() => {
  if (!entrenos.value.length) return 0;
  const total = entrenos.value.reduce((sum, e) => {
    const minutos = typeof e.duracion_repeticion === 'object' && e.duracion_repeticion !== null
      ? e.duracion_repeticion.minutes
      : parseInt(e.duracion_repeticion);
    return sum + (isNaN(minutos) ? 0 : minutos);
  }, 0);
  return Math.round(total / entrenos.value.length);
});

const totalRepeticiones = computed(() => {
  return entrenos.value.reduce((sum, e) => sum + (e.repeticiones || 0), 0);
});

const cargarEntrenamientos = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('https://protactics-api.onrender.com/entrenamientos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    entrenos.value = response.data || [];
  } catch (error) {
    console.error('Error cargando entrenamientos:', error);
  }
};

const filteredEntrenos = computed(() => {
  let result = [...entrenos.value];

  // Filtro por búsqueda
  if (searchQuery.value) {
    result = result.filter(entreno => entreno.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  // Filtro por fecha
  if (selectedFilter.value === "asc") {
    result.sort((a, b) => new Date(a.creado_en) - new Date(b.creado_en));
  } else if (selectedFilter.value === "desc") {
    result.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en));
  } else if (selectedFilter.value === "categoria") {
    result.sort((a, b) => a.categoria.localeCompare(b.categoria));
  }

  // Limitar a 5 entrenamientos
  return result.slice(0, 5);
});


onMounted(cargarEntrenamientos);
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to left, #0f172a, #155e75);
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
  padding: 40px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
}

.titulo {
  font-size: 2.4rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
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
  justify-content: center;
  padding: 20px;
  width: 160px;
  height: 180px;
  color: white;
  text-align: center;
  transition: 0.3s;
}

.circle-container {
  width: 50%;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 5%;
}

.entreno-card {
  width: 100%;
  height: 200px;
  background-color: #1e293b;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
}

.entreno-card:hover {
  transform: scale(1.03);
}

.entreno-info {
  padding: 20px;
}

.entreno-titulo {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: rgb(255, 255, 255);
}

.entreno-datos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2%;
  gap: 15px;
  /* Añade espacio entre grupos */
  margin-top: 5%;
}

.entreno-datos div {
  display: flex;
  justify-content: space-around;
  padding: 5px 0;

}

.popup-content h3,
.popup-content p {
  font-size: 1.4rem;
  text-align: center;
}

.search-filter-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
  padding: 10px;
  border-radius: 10px;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #334155;
  color: white;
}

.search-input::placeholder {
  color: #94a3b8;
}

.filter-select {
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #334155;
  color: white;
  cursor: pointer;
}

.filter-select:hover {
  background-color: #475569;
}

/* Estilos para el popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: #1e293b;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  color: white;
  text-align: left;
}

.btn-cerrar-popup {
  background-color: transparent;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-cerrar-popup img {
  width: 25px;
  height: 25px;
}

.btn-new {
  width: 100px;
  height: 100px;
  background: transparent;
  margin-right: 15px;
  transition: 0.3s;
}

.btn-new:hover {
  transform: scale(1.1);
}

.btn-ver-todos {
  font-size: 16px;
  color: #ffffff;
  /* Color del texto */
  background: linear-gradient(45deg, #334155, #446491);
  /* Fondo degradado */
  text-decoration: none;
  /* Sin subrayado */
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-block;
  transition: all 0.3s ease;
  /* Transición para los cambios de estilo */
}

.btn-ver-todos:hover {
  background: linear-gradient(45deg, #46566d, #4e76af);
  /* Cambio de gradiente al hacer hover */
  color: #ffffff;
  /* Color del texto al pasar el ratón */
}
</style>

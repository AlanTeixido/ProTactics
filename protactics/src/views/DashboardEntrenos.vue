<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
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
          <div class="entreno-actions">
            <button @click="iniciarEdicion(entreno)" class="btn-editar">Editar</button>
            <button @click="confirmarEliminarEntrenamiento(entreno.entrenamiento_id)" class="btn-eliminar">Eliminar</button>
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
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

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

// Función para eliminar un entrenamiento
const eliminarEntrenamiento = async (entrenamiento_id) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`https://protactics-api.onrender.com/entrenamientos/${entrenamiento_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    entrenos.value = entrenos.value.filter(entreno => entreno.entrenamiento_id !== entrenamiento_id);
  } catch (error) {
    console.error('❌ Error eliminando el entrenamiento:', error);
  }
};

// Función para editar un entrenamiento
const editarEntrenamiento = async (entrenamiento_id, data) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.put(`https://protactics-api.onrender.com/entrenamientos/${entrenamiento_id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarEntrenamientos();
  } catch (error) {
    console.error('❌ Error actualizando el entrenamiento:', error);
  }
};

const iniciarEdicion = (entreno) => {
  // Aquí puedes iniciar un proceso de edición, ya sea mostrando un formulario o redirigiendo a una página de edición
  alert(`Editar entrenamiento: ${entreno.titulo}`);
};

const confirmarEliminarEntrenamiento = (entrenamiento_id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este entrenamiento?")) {
    eliminarEntrenamiento(entrenamiento_id);
  }
};

onMounted(cargarEntrenamientos);
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: #0f172a; /* Fondo oscuro */
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
  color: rgb(4, 196, 68); /* Verde */
}

.btn-crear-entreno {
  background-color: rgb(4, 196, 68); /* Verde */
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.3s;
}

.btn-crear-entreno:hover {
  background-color: rgb(0, 132, 194); /* Azul */
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
  color: rgb(4, 196, 68); /* Verde */
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
  color: rgb(0, 132, 194); /* Azul */
}

.entreno-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-editar,
.btn-eliminar {
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
}

.btn-editar {
  background-color: rgb(4, 196, 68); /* Verde */
  color: white;
}

.btn-editar:hover {
  background-color: rgb(0, 132, 194); /* Azul */
}

.btn-eliminar {
  background-color: rgb(220, 38, 38); /* Rojo */
  color: white;
}

.btn-eliminar:hover {
  background-color: rgb(185, 28, 28); /* Rojo oscuro */
}
</style>

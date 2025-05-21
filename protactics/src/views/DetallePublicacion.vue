<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const route = useRoute();
const router = useRouter();

const publicacionData = ref(null);
const loading = ref(true);
const liked = ref(false);

const fetchPublicacion = async () => {
  try {
    const response = await axios.get(`https://protactics-api.onrender.com/publicaciones/${route.params.id}`);
    if (response.data) {
      publicacionData.value = response.data;
      liked.value = response.data.liked || false;
    } else {
      console.error("❌ Publicación no encontrada.");
    }
  } catch (error) {
    console.error('❌ Error obteniendo la publicación:', error);
  } finally {
    loading.value = false;
  }
};

const formatInterval = (interval) => {
  if (!interval || typeof interval !== 'object') return '-';
  const hours = interval.hours || 0;
  const mins = interval.minutes || 0;
  const secs = interval.seconds || 0;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatDate = (iso) => {
  if (!iso) return '-';
  return iso.split('T')[0];
};

onMounted(fetchPublicacion);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras class="btn-back" />

      <div v-if="loading" class="loading">Cargando publicación...</div>

      <div v-else-if="publicacionData" class="card">
        <h1 class="titulo">{{ publicacionData.titulo }}</h1>
        <p class="author">{{ publicacionData.entrenador || 'Desconocido' }}</p>

<!--<img
          :src="publicacionData.imagen_url || '/default.png'"
          alt="Imagen"
          class="post-image"
          @error="$event.target.src = '/default.png'"
        />-->

        <p class="content">{{ publicacionData.contenido }}</p>
        <div class="info-block">
          <p><strong>Categoría:</strong> {{ publicacionData.categoria || '-' }}</p>
          <p><strong>Campo:</strong> {{ publicacionData.campo || '-' }}</p>
          <p><strong>Fecha de Entrenamiento:</strong> {{ formatDate(publicacionData.fecha_entrenamiento) }}</p>
          <p><strong>Duración Total:</strong> {{ formatInterval(publicacionData.total_duracion) }}</p>
          <p><strong>Repetición:</strong> {{ formatInterval(publicacionData.duracion_repeticion) }}</p>
          <p><strong>Repeticiones:</strong> {{ publicacionData.repeticiones || '-' }}</p>
          <p><strong>Descanso:</strong> {{ publicacionData.descanso || '-' }} min</p>
          <p><strong>Notas:</strong> {{ publicacionData.notas_adicionales || '-' }}</p>
        </div>
      </div>

      <div v-else class="loading">❌ Publicación no encontrada.</div>
    </div>
  </div>
</template>

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
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 5%;
}

.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #facc15;
}

.card {
  padding: 30px;
  border-radius: 15px;
  background: linear-gradient(to right, #0bd1df, #155e75);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  text-align: left;
  max-width: 600px;
  width: 100%;
  color: white;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}

.author {
  font-size: 1rem;
  font-weight: bold;
  color: #facc15;
  margin-bottom: 15px;
  text-align: center;
}

.post-image {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin: 15px 0;
}

.content {
  font-size: 1rem;
  margin: 15px 0;
}

.info-block p {
  font-size: 1rem;
  margin: 4px 0;
}

.btn-back {
  position: absolute;
  top: 30px;
  left: 300px;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 30px 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .btn-back {
    position: relative;
    left: 0;
    top: 0;
    margin-bottom: 20px;
  }
  .titulo {
    font-size: 2rem;
  }
}
</style>

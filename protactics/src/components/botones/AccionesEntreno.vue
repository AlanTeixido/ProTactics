<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_URL } from '@/config';

const props = defineProps({
  entreno: { type: Object, required: true },
});
const emit = defineEmits(['eliminado']);

const router = useRouter();
const ocupado = ref(false);
const error = ref('');

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('authToken')}` });

// Obre la pizarra desada d'aquest entrenament. Si encara no en té, la pizarra
// comença amb els jugadors convocats (la API no sempre els retorna).
const abrirPizarra = async () => {
  ocupado.value = true;
  try {
    const ids = props.entreno.jugadores || [];
    if (ids.length) {
      const { data } = await axios.get(`${API_URL}/jugadores`, { headers: authHeaders() });
      localStorage.setItem('jugadoresPizarra', JSON.stringify(data.filter((j) => ids.includes(j.jugador_id))));
    } else {
      localStorage.removeItem('jugadoresPizarra');
    }
  } catch (e) {
    console.error('❌ Error cargando los jugadores del entrenamiento:', e);
  } finally {
    ocupado.value = false;
  }
  router.push({ path: '/pizarra/futbol', query: { entrenamiento_id: props.entreno.entrenamiento_id } });
};

const editar = () => {
  router.push(`/editar-entrenamiento/${props.entreno.entrenamiento_id}`);
};

const eliminar = async () => {
  if (!window.confirm(`¿Eliminar el entrenamiento "${props.entreno.titulo}"?`)) return;
  ocupado.value = true;
  error.value = '';
  try {
    await axios.delete(`${API_URL}/entrenamientos/${props.entreno.entrenamiento_id}`, { headers: authHeaders() });
    emit('eliminado', props.entreno.entrenamiento_id);
  } catch (e) {
    error.value = e.response?.data?.error || 'No se pudo eliminar el entrenamiento.';
  } finally {
    ocupado.value = false;
  }
};
</script>

<template>
  <div class="acciones">
    <button type="button" class="accion" :disabled="ocupado" @click="abrirPizarra">Ver pizarra</button>
    <button type="button" class="accion" :disabled="ocupado" @click="editar">Editar</button>
    <button type="button" class="accion peligro" :disabled="ocupado" @click="eliminar">Eliminar</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.accion {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #334155, #446491);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.accion:hover:not(:disabled) {
  transform: scale(1.05);
}

.accion:disabled {
  opacity: 0.6;
  cursor: progress;
}

.accion.peligro {
  background: #b91c1c;
}

.error {
  width: 100%;
  margin: 0;
  color: #fca5a5;
  text-align: center;
  font-size: 0.95rem;
}
</style>

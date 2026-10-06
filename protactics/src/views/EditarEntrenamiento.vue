<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-content">
      <ButtonAtras />
      <h2 class="titulo">Editar entrenamiento</h2>

      <Loader v-if="loading" />

      <div v-else-if="!entrenamiento" class="estado">
        No se ha encontrado el entrenamiento.
        <RouterLink to="/entrenos" class="link">Volver a entrenamientos</RouterLink>
      </div>

      <form v-else class="formulario" @submit.prevent="guardarCambios">
        <div class="input-group">
          <label for="titulo">Nombre del entrenamiento</label>
          <input id="titulo" v-model="entrenamiento.titulo" type="text" required />
        </div>

        <div class="input-group">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="entrenamiento.descripcion" rows="3"></textarea>
        </div>

        <div class="input-group doble">
          <div>
            <label for="categoria">Categoría</label>
            <select id="categoria" v-model="entrenamiento.categoria">
              <option value="abp">ABP</option>
              <option value="fisica">Física</option>
              <option value="tactica">Táctica</option>
              <option value="finalizacion">Finalización</option>
              <option value="posesion">Posesión</option>
            </select>
          </div>
          <div>
            <label for="fecha">Fecha</label>
            <input id="fecha" v-model="entrenamiento.fecha_entrenamiento" type="date" />
          </div>
        </div>

        <div class="input-group">
          <label for="campo">Campo</label>
          <input id="campo" v-model="entrenamiento.campo" type="text" />
        </div>

        <div class="input-group doble">
          <div>
            <label for="duracion">Duración (min)</label>
            <input id="duracion" v-model.number="duracion" type="number" min="1" />
          </div>
          <div>
            <label for="repeticiones">Repeticiones</label>
            <input id="repeticiones" v-model.number="entrenamiento.repeticiones" type="number" min="1" />
          </div>
        </div>

        <div class="input-group doble">
          <div>
            <label for="descanso">Descanso (min)</label>
            <input id="descanso" v-model.number="entrenamiento.descanso" type="number" min="0" />
          </div>
          <div>
            <label for="valoracion">Valoración (0-5)</label>
            <input id="valoracion" v-model.number="entrenamiento.valoracion" type="number" min="0" max="5" />
          </div>
        </div>

        <div class="input-group">
          <label for="notas">Notas</label>
          <textarea id="notas" v-model="entrenamiento.notas" rows="2"></textarea>
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <div class="botones">
          <button type="button" class="back-btn" @click="router.push('/entrenos')">Cancelar</button>
          <button type="submit" :disabled="guardando">{{ guardando ? 'Guardando...' : 'Guardar cambios' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from '@/config';
import { useRoute, useRouter, RouterLink } from "vue-router";
import Loader from "../components/Loader.vue";
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';

const route = useRoute();
const router = useRouter();
const entrenamiento = ref(null);
const duracion = ref(null);
const loading = ref(true);
const guardando = ref(false);
const error = ref('');
const entrenamientoId = route.params.id;

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("authToken")}` });

// La API no té GET /entrenamientos/:id: es busca dins la llista de l'entrenador.
const cargarEntrenamiento = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/entrenamientos`, { headers: authHeaders() });
    const encontrado = data.find((e) => String(e.entrenamiento_id) === String(entrenamientoId));
    if (encontrado) {
      entrenamiento.value = {
        ...encontrado,
        fecha_entrenamiento: encontrado.fecha_entrenamiento ? String(encontrado.fecha_entrenamiento).slice(0, 10) : '',
      };
      const d = encontrado.duracion_repeticion;
      duracion.value = d && typeof d === 'object' ? (d.hours || 0) * 60 + (d.minutes || 0) : d;
    }
  } catch (e) {
    console.error("❌ Error obteniendo entrenamiento:", e);
  } finally {
    loading.value = false;
  }
};

const guardarCambios = async () => {
  guardando.value = true;
  error.value = '';
  try {
    const { titulo, descripcion, categoria, campo, fecha_entrenamiento, repeticiones, descanso, valoracion, imagen_url, notas } = entrenamiento.value;
    await axios.put(`${API_URL}/entrenamientos/${entrenamientoId}`, {
      titulo, descripcion, categoria, campo, fecha_entrenamiento, repeticiones, descanso, valoracion, imagen_url, notas,
      duracion_repeticion: { minutes: duracion.value || 0 },
    }, { headers: authHeaders() });
    router.push("/entrenos");
  } catch (e) {
    console.error("❌ Error guardando cambios:", e);
    error.value = e.response?.data?.error || "No se pudieron guardar los cambios.";
  } finally {
    guardando.value = false;
  }
};

onMounted(cargarEntrenamiento);
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
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.titulo {
  font-size: 2.4rem;
  font-weight: bold;
  text-transform: uppercase;
}

.estado {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #cbd5e1;
}

.link {
  color: #7dd3fc;
}

.formulario {
  width: 100%;
  max-width: 720px;
  background-color: #0f172a;
  padding: 30px;
  border-radius: 12px;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.input-group.doble {
  flex-direction: row;
  gap: 20px;
}

.input-group.doble > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 8px;
  color: #e2e8f0;
}

input,
select,
textarea {
  padding: 10px;
  border-radius: 8px;
  background-color: #334155;
  color: white;
  border: none;
  font-size: 1rem;
  font-family: inherit;
}

.botones {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.botones button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  background-color: #10b981;
  color: #0f172a;
}

.botones button:disabled {
  opacity: 0.6;
  cursor: progress;
}

.botones .back-btn {
  background: transparent;
  border: 2px solid #ef4444;
  color: #fca5a5;
}

.error-msg {
  color: #fca5a5;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-content {
    margin-left: 0;
    padding: 30px 20px;
  }

  .input-group.doble {
    flex-direction: column;
  }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonCrearJugador from '@/components/botones/ButtonCrearJugador.vue';

const jugadores = ref([]);
const user = ref({
  id: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "Usuari",
  rol: localStorage.getItem("userRol") || "desconegut",
});

const esEntrenador = computed(() => user.value.rol === 'entrenador');

// Carrega els jugadors propis
const cargarJugadores = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`https://protactics-api.onrender.com/jugadores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    jugadores.value = response.data || [];
  } catch (error) {
    console.error("Error carregant jugadors:", error);
  }
};

const eliminarJugador = async (id) => {
  if (!id) return alert("ID de jugador no vàlid.");
  if (!confirm("Segur que vols eliminar aquest jugador?")) return;

  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`https://protactics-api.onrender.com/jugadores/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    jugadores.value = jugadores.value.filter(j => j.jugador_id !== id);
  } catch (error) {
    console.error("❌ Error eliminant jugador:", error);
    alert("No s'ha pogut eliminar el jugador.");
  }
};


onMounted(cargarJugadores);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <h2 class="titulo">Gestió de jugadors</h2>
      <div class="rol-badge">Accedint com a <strong>{{ user.rol }}</strong></div>

      <!-- Botó per crear jugador -->
      <div class="crear-jugador-box">
        <ButtonCrearJugador />
      </div>

      <!-- Llista de jugadors -->
      <div class="jugadors-llista">
        <h3>Jugadors del teu equip:</h3>
        <div v-if="jugadores.length === 0" class="empty-msg">
          No tens jugadors registrats encara.
        </div>

        <ul class="jugadors">
          <li v-for="j in jugadores" :key="j.jugador_id" class="jugador">
            <div class="jugador-info">
              <strong>{{ j.nombre }} {{ j.apellido }}</strong>
              <span>· Posició: {{ j.posicion }}</span>
              <span>· Dorsal: {{ j.dorsal }}</span>
            </div>
            <button class="btn-delete" @click="eliminarJugador(j.jugador_id)">🗑️</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
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
  font-size: 2.4rem;
  font-weight: 600;
}

.rol-badge {
  background-color: #ffffff22;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.95rem;
  color: #e2e8f0;
  width: fit-content;
}

.crear-jugador-box {
  margin-top: 10px;
  margin-bottom: 30px;
  width: fit-content;
}

.jugadors-llista h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.empty-msg {
  color: #cbd5e1;
  font-style: italic;
}

.jugadors {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 15px;
}

.jugador {
  background-color: #1e293b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jugador span {
  display: block;
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-top: 5px;
}

.btn-delete {
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-delete:hover {
  background: #b91c1c;
}
</style>

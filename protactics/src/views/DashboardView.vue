<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import MenuDashboard from '@/components/MenuDashboard.vue';

const router = useRouter();

const user = ref({
  username: localStorage.getItem("username") || "Usuari",
  rol: localStorage.getItem("userRol") || "desconegut",
});

const goTo = (path) => {
  router.push(path);
};

const allOptions = [
  { label: "Entrenaments", icon: "📋", path: "/entrenamientos", color: "#1e3a8a", roles: ["entrenador"] },
  { label: "Partits", icon: "⚽", path: "/partits", color: "#1e3a8a", roles: ["entrenador"] },
  { label: "Pissarra", icon: "🧠", path: "/pissarra", color: "#facc15", roles: ["entrenador"] },
  { label: "Planificador", icon: "📅", path: "/planificador", color: "#facc15", roles: ["entrenador"] },
  { label: "Jugadors", icon: "🧍", path: "/jugadores", color: "#16a34a", roles: ["entrenador"] },
  { label: "Entrenadors", icon: "🧑‍🏫", path: "/entrenadors", color: "#0ea5e9", roles: ["club"] },
  { label: "Configuració", icon: "⚙️", path: "/configuracio", color: "#9ca3af", roles: ["club", "entrenador"] },
];

// Filtra opcions segons el rol de l'usuari
const options = computed(() => {
  return allOptions.filter(opt => opt.roles.includes(user.value.rol));
});
</script>


<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <h2 class="titulo">Benvingut, {{ user.username }}</h2>
      <div class="rol-badge">Accedint com a <strong>{{ user.rol }}</strong></div>

      <div class="grid">
        <div
          v-for="(opt, i) in options"
          :key="i"
          class="card"
          :style="{ backgroundColor: opt.color }"
          @click="goTo(opt.path)"
        >
          <div class="icon">{{ opt.icon }}</div>
          <div class="label">{{ opt.label }}</div>
        </div>
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
  align-items: center;
  gap: 40px;
}

/* Títol i rol */
.titulo {
  font-size: 2.4rem;
  font-weight: 600;
  color: #fff;
}

.rol-badge {
  background-color: #ffffff22;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.95rem;
  color: #e2e8f0;
}

/* Targetes */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
}

.card {
  padding: 35px 20px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.card:hover {
  transform: translateY(-6px);
}

.icon {
  font-size: 2.6rem;
  margin-bottom: 10px;
}

.label {
  font-size: 1.05rem;
  font-weight: 600;
  color: white;
}

@media (max-width: 768px) {
  .dashboard-container {
    margin-left: 0;
    padding: 30px 20px;
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
}
</style>

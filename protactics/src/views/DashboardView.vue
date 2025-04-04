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
  { label: "Entrenamientos", icon: "cono.png", path: "/entrenos", color: "#1e3a8a", roles: ["entrenador"] },
  { label: "Pizarra", icon: "campo.png", path: "/pizarra", color: "#facc15", roles: ["entrenador"] },
  { label: "Jugadores", icon: "jugador.png", path: "/jugadores", color: "#16a34a", roles: ["entrenador"] },
  { label: "Entrenadores", icon: "entrenadores.png", path: "/crearEntrenador", color: "#0ea5e9", roles: ["club"] },
  { label: "Configuración", icon: "ajuste.png", path: "/editar", color: "#9ca3af", roles: ["club", "entrenador"] },
  { label: "Publicaciones", icon: "periodico.png", path: "/publicaciones", color: "#9ca3af", roles: ["club", "entrenador"] },
  { label: "Equipos", icon: "pelota.png", path: "/equipos", color: "#0ea5e9", roles: ["club"] },
  { label: "Subir publicaciones", icon: "mas.png", path: "/subirPublicaciones", color: "#0ea5e9", roles: ["entrenador"] },
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
      <h2 class="titulo">Bienvenido <span>{{ user.username }}</span></h2>
      <div class="rol-badge">Accediendo como <strong>{{ user.rol }}</strong></div>

      <div class="grid">
        <div
          v-for="(opt, i) in options"
          :key="i"
          class="card"
          @click="goTo(opt.path)"
        >
          <img :src="`../../public/img/${opt.icon}`" class="img">
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
  background: linear-gradient(to left, #0f172a, #155e75);
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
  margin-top: 5%;
}

/* Títol i rol */
.titulo {
  width: 40%;
  text-transform: uppercase;
  font-size: 600%;
  font-weight: 300;
  color: #fff;
  text-align: center;
  line-height: 40%;
}

span{
  font-size: 35%;
  font-weight: bold;

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
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 900px;
}

.card {
  padding: 35px 20px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  background: linear-gradient(to right, #0bd1df, #155e75);
  background-color: #0da7bb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.card:hover {
  transform: scale(1.05);
}

.img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.label {
  font-size: 1.05rem;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
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

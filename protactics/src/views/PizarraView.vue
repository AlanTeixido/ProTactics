<template>
  <div class="dashboard">
    <!-- Menú fijo a la izquierda -->
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <!-- Contenido principal -->
    <div class="dashboard-content">
      <div class="container">
        <h2 class="section-title">Selecciona un deporte</h2>
        <div class="wrapper">
          <div v-for="deporte in deportes" :key="deporte.nombre" class="grid-item">
            <RouterLink :to="`/pizarra/${deporte.nombre}`">
              <img :src="getImageUrl(deporte.imagen)" class="grid-image" />
              <div class="item-transition">
                <p class="title">{{ deporte.nombre }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuDashboard from "@/components/MenuDashboard.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";

const getImageUrl = (path) => new URL(path, import.meta.url).href;

const deportes = ref([
  { nombre: "futbol", imagen: "../assets/img/futbol.jpg" },
  { nombre: "baloncesto", imagen: "../assets/img/basquet.jpg" },
  { nombre: "padel", imagen: "../assets/img/padel.jpg" },
  { nombre: "gimnasio", imagen: "../assets/img/gym.jpg" },
  { nombre: "ciclismo", imagen: "../assets/img/ciclismo.jpg" },
  { nombre: "atletismo", imagen: "../assets/img/atletismo2.jpg" }
]);
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  overflow-y: auto;
}

.section-title {
  text-align: left;
  margin-top: 10%;
  border-bottom: 1px solid #cccccc4d;
  margin-left: 4.5%;
  margin-right: 4.5%;
  text-transform: uppercase;
  font-style: italic;
}

.wrapper {
  display: grid;
  gap: 15% 5px;
  padding: 20px;
  margin-top: 8%;
  margin-bottom: 10%;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 80%;
  margin-top: 15%;
}

.grid-item img {
  width: 100%;
  object-fit: cover;
  height: 500px;
  display: block;
  transition: transform 0.3s;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.item-transition {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.grid-item:hover .item-transition {
  opacity: 1;
}

.title {
  font-size: 1.5em;
  margin: 10px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
}

h2 {
  font-weight: 1000;
}

span {
  font-weight: 300;
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
  }

  .wrapper {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>

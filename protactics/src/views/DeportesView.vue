<template>
  <div class="dashboard">
    <!-- Menú fijo a la izquierda -->
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <!-- Contenido principal -->
    <div class="dashboard-content">
      <h2>Selecciona un deporte</h2>
      <div class="wrapper">
        <RouterLink>
          <ButtonCrearJugador />
        </RouterLink>
        <!-- Usamos un v-for para recorrer el array de deportes -->
        <div v-for="deporte in deportes" :key="deporte.nombre" class="grid-item">
          <!-- RouterLink para redirigir al hacer clic en el deporte -->
          <RouterLink :to="`/entrenamiento/${deporte.nombre}`">
            <img :src="getImageUrl(deporte.imagen)" class="grid-image" />
            <div class="item-transition">
              <p class="title">{{ deporte.nombre }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuDashboard from "@/components/MenuDashboard.vue";
import ButtonCrearJugador from "@/components/botones/ButtonCrearJugador.vue";

const getImageUrl = (path) => new URL(path, import.meta.url).href;

const deportes = ref([
  { nombre: "futbol", imagen: "../assets/img/futbol.jpg", gridArea: "sport" },
  /*{ nombre: "baloncesto", imagen: "../assets/img/basquet.jpg", gridArea: "tees" },
  { nombre: "padel", imagen: "../assets/img/padel.jpg", gridArea: "hoodies" },
  { nombre: "gimnasio", imagen: "../assets/img/gym.jpg", gridArea: "ladies-shirt" },
  { nombre: "ciclismo", imagen: "../assets/img/ciclismo.jpg", gridArea: "youth" },
  { nombre: "atletismo", imagen: "../assets/img/atletismo2.jpg", gridArea: "kids" },
  { nombre: "natacion", imagen: "../assets/img/natacion.jpeg", gridArea: "kids" }*/
]);
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Contenedor principal */
.dashboard {
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
}

/* Menú a la izquierda fijo */
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

/* Contenido derecho */
.dashboard-content {
  flex: 1;
  margin-left: 250px; /* Ajuste para evitar que el menú lo tape */
  padding: 20px;
  overflow-y: auto;
}

/* Estilos del grid */
.wrapper {
  display: grid;
  gap: 30px;
  padding: 20px;
  margin-top: 3%;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  /* Se adapta automáticamente al tamaño de la pantalla */
  place-items: center;
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 90%;
}

.grid-item img {
  width: 100%;
  object-fit: cover;
  height: 300px;
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
  font-size: 1.2em;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
}

h2 {
    color: rgb(73, 73, 73);
    text-transform: uppercase;
    text-align: left;
    margin-top: 5%;
    margin-left: 3%;
  }

/* Responsive */
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

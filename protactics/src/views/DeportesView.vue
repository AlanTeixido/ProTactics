<template>
  <HeaderSection />
  <div class="container">

    <div class="wrapper">
      <!-- Usamos un v-for para recorrer el array de deportes -->
      <div v-for="deporte in deportes" :key="deporte.nombre" class="grid-item">
        <!-- RouterLink para redirigir al clickear el nombre del deporte -->
        <RouterLink :to="`/entrenamiento/${deporte.nombre}`">
          <img :src="getImageUrl(deporte.imagen)" class="grid-image" />
          <div class="item-transition">
            <p class="title">{{ deporte.nombre }}</p>
          </div>
        </RouterLink>

      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script setup>
import { ref } from "vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import FormContact from "@/components/FormContact.vue";

const getImageUrl = (path) => new URL(path, import.meta.url).href;

const deportes = ref([
  { nombre: "futbol", imagen: "../assets/img/futbol.jpg", gridArea: "sport" },
  { nombre: "baloncesto", imagen: "../assets/img/basquet.jpg", gridArea: "tees" },
  { nombre: "padel", imagen: "../assets/img/padel.jpg", gridArea: "hoodies" },
  { nombre: "gimnasio", imagen: "../assets/img/gym.jpg", gridArea: "ladies-shirt" },
  { nombre: "ciclismo", imagen: "../assets/img/ciclismo.jpg", gridArea: "youth" },
  { nombre: "atletismo", imagen: "../assets/img/atletismo2.jpg", gridArea: "kids" }
]);
</script>

<style scoped>
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
  /* Ajusté el espacio vertical (de arriba a abajo) a 10px y horizontal (entre columnas) a 5px */
  padding: 20px;
  margin-top: 8%;
  margin-bottom: 10%;
  grid-template-columns: repeat(3, 1fr);
  /* Dos columnas de tamaño igual */
  place-items: center;
  /* Centra todos los ítems tanto horizontal como verticalmente */
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
</style>

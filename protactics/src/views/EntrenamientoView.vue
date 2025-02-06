<template>
  <HeaderSection />
  <div class="container">
    <h2 class="section-title">Explora Deportes</h2>
    <div class="wrapper">
      <div v-for="(deporte, index) in deportes" :key="index" class="grid-item" :style="{ '--grid-area': deporte.gridArea }">
        <p>{{ deporte.nombre }}</p>
        <img :src="getImageUrl(deporte.imagen)" :alt="deporte.nombre" class="grid-image" />
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<script setup>
import { ref } from "vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";

const getImageUrl = (path) => new URL(path, import.meta.url).href;

const deportes = ref([
  { nombre: "Fútbol", imagen: "../assets/img/futbol.jpg", gridArea: "sport" },
  { nombre: "Baloncesto", imagen: "../assets/img/basquet.jpg", gridArea: "tees" },
  { nombre: "Pádel", imagen: "../assets/img/padel.jpg", gridArea: "hoodies" },
  { nombre: "Gimnasio", imagen: "../assets/img/gym.jpg", gridArea: "ladies-shirt" },
  { nombre: "Ciclismo", imagen: "../assets/img/ciclismo.jpg", gridArea: "youth" },
  { nombre: "Atletismo", imagen: "../assets/img/atletismo2.jpg", gridArea: "kids" }
]);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  margin-bottom: 5%;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.wrapper {
  display: grid;
  gap: 1rem;
  grid-auto-rows: 200px;
  width: 80%;
  max-width: 1000px;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
}

.grid-item:hover {
  transform: scale(1.07);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.grid-item:hover img {
  transform: scale(1.1);
}

.grid-item p {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
}
</style>

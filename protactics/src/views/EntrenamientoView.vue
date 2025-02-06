<template>
  <HeaderSection />
  <div class="container">
    <h2 class="section-title">Explora Deportes</h2>
    <div class="wrapper">
      <div v-for="(deporte, index) in deportes" :key="index" class="grid-item" :style="{ '--grid-area': deporte.gridArea }">
        <p class="title">{{ deporte.nombre }}</p>
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
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #00e6e6;
  text-shadow: 2px 2px 5px rgba(0, 230, 230, 0.5);
}

.wrapper {
  display: grid;
  gap: 1.5rem;
  grid-auto-rows: 250px;
  width: 90%;
  max-width: 1200px;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: center;
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
}

.grid-item:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

.grid-item:hover img {
  transform: scale(1.15);
}

.grid-item .title {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>

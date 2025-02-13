<template>
  <HeaderSection />
  <div class="container">
    <h2 class="section-title">Explora Deportes</h2>
    <div class="wrapper">
      <div v-for="(deporte, index) in deportes" :key="index" class="grid-item">
        <RouterLink :to="`/futbol`"><img :src="getImageUrl(deporte.imagen)" class="grid-image" /></RouterLink> 
        <div class="item-transition">
          <p class="title">{{ deporte.nombre }}</p>
        </div>
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
.section-title {
    text-align: center;
    margin-top: 10%;
}

.wrapper {
    display: grid;
    gap: 20px 5px; /* Ajusté el espacio vertical (de arriba a abajo) a 10px y horizontal (entre columnas) a 5px */
    padding: 20px;
    margin-top: 5%;
    margin-bottom: 10%;
    grid-template-columns: repeat(2, 1fr); /* Dos columnas de tamaño igual */
    place-items: center; /* Centra todos los ítems tanto horizontal como verticalmente */
}

.grid-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    width: 80%;
}

.grid-item img {
    width: 100%;
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
}
</style>

<template>
  <div class="entrenamientos-container">
    <div>
      <MenuDashboard />
    </div>
    
    <div class="entrenamientos-page">
      <h2>Mis Entrenamientos</h2>
      <Entrenamientos />
    </div>
  </div>
  
  </template>
  
  <script setup>
  import Entrenamientos from "@/components/Entrenamientos.vue";
import MenuDashboard from "@/components/MenuDashboard.vue";
  </script>
  
  <style scoped>
  .entrenamientos-container {
    display: flex;
  }
  .entrenamientos-page {
    width: 100%;
    text-align: center;
    background-color: #f3f3f3;
  }
  h2 {
    color: rgb(73, 73, 73);
    text-transform: uppercase;
    text-align: left;
    margin-top: 5%;
    margin-left: 12%;
  }
  </style>
  
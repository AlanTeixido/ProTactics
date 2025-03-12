<template>
    <HeaderSection />
    <div class="entrenamientos-page">
      <Entrenamientos />
    </div>
  </template>
  
  <script setup>
  import HeaderSection from "@/components/HeaderSection.vue";
  import Entrenamientos from "@/components/Entrenamientos.vue";
  </script>
  
  <style scoped>
  .entrenamientos-page {
    text-align: center;
    padding: 20px;
    background-color: #f3f3f3;
  }



  </style>
  
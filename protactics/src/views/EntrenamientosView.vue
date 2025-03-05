<template>
    <HeaderSection />
    <div class="entrenamientos-page">
      <Entrenamientos />
    </div>
    <FooterSection />
  </template>
  
  <script setup>
  import HeaderSection from "@/components/HeaderSection.vue";
  import FooterSection from "@/components/FooterSection.vue";
  import Entrenamientos from "@/components/Entrenamientos.vue";
  </script>
  
  <style scoped>
  .entrenamientos-page {
    text-align: center;
    padding: 20px;
  }



  </style>
  
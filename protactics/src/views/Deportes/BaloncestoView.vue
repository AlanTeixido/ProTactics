<template>
  <div>
    <h1>Detalles de {{ nombreDeporte }}</h1>
    <h1>Detalles do {{ nombreDeporte }}</h1>
    <h1>Detalles du {{ nombreDeporte }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const nombreDeporte = route.params.nombre;
</script>

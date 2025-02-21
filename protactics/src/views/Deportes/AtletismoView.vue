<template>
  <div>
    <h1>Detalles de {{ nombreDeporte }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const nombreDeporte = route.params.nombre;
</script>

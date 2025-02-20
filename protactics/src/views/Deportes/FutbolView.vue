<template>
  <div>
    <h1>Detalles de {{ nombreDeporte }}</h1>
    <!-- Puedes agregar más detalles del deporte aquí -->

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const nombreDeporte = route.params.nombre; // Accede al parámetro 'nombre'

</script>

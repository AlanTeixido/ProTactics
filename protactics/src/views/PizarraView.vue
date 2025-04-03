<template>
  <div class="contenedor">
    <!-- Menú fijo a la izquierda -->
    <div class="menu">
      <MenuPizarra />
    </div>
      <Draggable />
  </div>
</template>

<script setup>
import Draggable from "@/components/Draggable.vue";
import MenuPizarra from "@/components/MenuPizarra.vue";
</script>

<style scoped>

</style>

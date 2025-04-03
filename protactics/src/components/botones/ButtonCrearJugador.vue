<script setup>
</script>

<template>
  <!-- RouterLink directe amb classes de botó -->
  <RouterLink to="/crearJugador" class="button-crear-jugador">
    <div class="button-content">
      <span class="plus-sign">+</span>
      <p>Crear Jugador</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.button-crear-jugador {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(45deg, #4caf50, #0a74da);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none; /* Eliminar subratllat */
}

.button-crear-jugador:hover {
  background-color: #45a049;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plus-sign {
  font-size: 2rem;
  margin-right: 10px;
}

.button-crear-jugador p {
  font-size: 1rem;
}
</style>

<script setup>
</script>

<template>
  <div>
    <!-- Botón con RouterLink para redirigir a /crear-equipo -->
    <button class="button-crear-equipo">
      <RouterLink to="/crearJugador" class="router-link">
        <div class="button-content">
          <span class="plus-sign">+</span>
          <p>Añadir jugador</p>
        </div>
      </RouterLink>
    </button>
  </div>
</template>

<style scoped>
.button-crear-equipo {
  padding: 10px 20px;
  background: linear-gradient(45deg, #4caf50, #0a74da);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.button-crear-equipo:hover {
  transform: scale(1.05);
}

.router-link {
  text-decoration: none;
  color: white;
}

.button-content {
  display: flex;
  align-items: center;
}

.plus-sign {
  font-size: 2rem;
  margin-right: 10px;
}

.button-crear-equipo p {
  font-size: 1rem;
}
</style>

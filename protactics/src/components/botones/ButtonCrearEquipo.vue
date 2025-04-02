<script setup>
</script>

<template>
  <div>
    <!-- Botón con RouterLink para redirigir a /crear-equipo -->
    <button class="button-crear-equipo">
      <RouterLink to="/crear-equipo" class="router-link">
        <div class="button-content">
          <span class="plus-sign">+</span>
          <p>Añadir equipo</p>
        </div>
      </RouterLink>
    </button>
  </div>
</template>

<style scoped>
.button-crear-equipo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #3b82f6; /* Azul */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-crear-equipo:hover {
  background-color: #2563eb;
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

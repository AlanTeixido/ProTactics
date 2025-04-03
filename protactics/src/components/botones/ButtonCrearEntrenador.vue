<script setup>
</script>

<template>
  <div>
    <!-- Botón con RouterLink para redirigir a /crearEntrenador -->
    <button class="button-crear-entrenador">
      <RouterLink to="/crearEntrenador" class="router-link">
        <div class="button-content">
          <span class="plus-sign">+</span>
          <p>Añadir entrenador</p>
        </div>
      </RouterLink>
    </button>
  </div>
</template>

<style scoped>
/* Estilo para el botón de añadir entrenador */
.button-crear-entrenador {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(45deg, #4caf50, #0a74da);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-crear-entrenador:hover {
  background-color: #45a049;
}

.router-link {
  text-decoration: none; /* Eliminar el subrayado en el enlace */
  color: white; /* Mantener el texto blanco */
}

.button-content {
  display: flex;
  align-items: center;
}

.plus-sign {
  font-size: 2rem;
  margin-right: 10px;
}

.button-crear-entrenador p {
  font-size: 1rem;
}
</style>

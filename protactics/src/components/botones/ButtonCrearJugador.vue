<script setup></script>

<template>
  <div>
    <!-- Botón con RouterLink para redirigir a /crearJugador -->
    <button class="button-crear-jugador">
      <RouterLink to="/crearJugador" class="router-link">
        <div class="button-content">
          <span class="plus-sign">+</span>
          <p>Crear Jugador</p>
        </div>
      </RouterLink>
    </button>
  </div>
</template>

<style scoped>
/* Estilo para el botón de añadir jugador */
.button-crear-jugador {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-crear-jugador:hover {
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

.button-crear-jugador p {
  font-size: 1rem;
}
</style>

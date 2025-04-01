<template>
  <div class="entrenamientos-container">
    <div class="menu-container">
      <MenuDashboard />
    </div>
    
    <div class="entrenamientos-page">
      <h2>Mis Entrenamientos</h2>
      <Entrenamientos />
    </div>
  </div>
</template>

<script setup>
import MenuDashboard from "@/components/MenuDashboard.vue";
</script>

<style scoped>
.entrenamientos-container {
  display: flex;
  height: 100vh; /* Aseguramos que el contenedor ocupe toda la altura */
}

.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px; /* Ajusta el tamaño del menú a tu gusto */
  height: 100vh; /* Asegura que el menú ocupe toda la altura */
  background-color: #fff; /* El color de fondo del menú */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Agrega sombra para el efecto */
  z-index: 10; /* Para asegurarte de que esté por encima de los demás elementos */
}

.entrenamientos-page {
  margin-left: 200px; /* Deja espacio para el menú */
  width: calc(100% - 200px); /* Asegura que el contenido no quede debajo del menú */
  text-align: center;
  background-color: #f3f3f3;
  overflow-y: auto; /* Esto permite el scroll solo en esta sección */
  height: 100vh; /* Asegura que ocupe toda la altura disponible */
}

h2 {
  color: rgb(73, 73, 73);
  text-transform: uppercase;
  text-align: left;
  margin-top: 5%;
  margin-left: 12%;
}
</style>

<script setup>
import FormCrearEquipos from '@/components/formularios/FormCrearEquipo.vue';
import MenuDashboard from '@/components/MenuDashboard.vue';
</script>

<template>
  <div class="dashboard">
    <!-- Menú fijo a la izquierda -->
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <!-- Contenido principal -->
    <div class="dashboard-content">
      <h2>Añadir equipo</h2>
      <FormCrearEquipos />
    </div>
  </div>
</template>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  overflow-y: auto;
}

h2 {
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-align: left;
  margin-top: 5%;
  margin-left: 3%;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-content {
    margin-left: 0;
  }
}
</style>

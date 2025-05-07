<script setup>
import ButtonAtras from '@/components/botones/ButtonAtras.vue';
import FormCrearEntreno from '@/components/formularios/FormCrearEntreno.vue';
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
      <div class="back">
        <ButtonAtras />
      </div>
      <div>
        <h1>CREAR ENTRENO</h1>
        <FormCrearEntreno />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
}

/* Menú a la izquierda fijo */
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

/* Contenido derecho */
.dashboard-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.intro{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-right: 10%;
  width: 40%;
}

span{
  font-weight: bold;
}

/* Estilos del grid */
.wrapper {
  display: grid;
  gap: 30px;
  padding: 20px;
  margin-top: 3%;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  /* Se adapta automáticamente al tamaño de la pantalla */
  place-items: center;
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 90%;
}

.grid-item img {
  width: 100%;
  object-fit: cover;
  height: 300px;
  display: block;
  transition: transform 0.3s;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.item-transition {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.grid-item:hover .item-transition {
  opacity: 1;
}

.title {
  font-size: 1.2em;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
}

h2 {
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-align: left;
  margin-top: 5%;
  margin-left: 3%;
}

.back {
  position: absolute;
  top: 30px;
  left: 300px;
  z-index: 10;
}

/* Responsive */
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

  .wrapper {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>

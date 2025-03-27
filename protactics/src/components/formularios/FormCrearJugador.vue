<template>
     <div class="form-crearJugador">
      <h2 class="crearJugador-title">Información del jugador</h2>
      <form @submit.prevent="crearJugador" class="crearJugador-form">
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="nombre" type="email" placeholder="Nombre" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Apellido</label>
          <input v-model="apellido" type="password" placeholder="Apellido" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Posicion</label>
          <input v-model="posicion" type="select" placeholder="Posición" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Dorsal</label>
          <input v-model="dorsal" type="dorsal" placeholder="Apellido" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Iniciar sesión</button>
      </form>
      <p class="register-link">
        ¿No tienes cuenta? <RouterLink to="/register" class="link">Regístrate</RouterLink>
      </p>
    </div>
  </template>
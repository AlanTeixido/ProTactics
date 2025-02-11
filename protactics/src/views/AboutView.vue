<template>
    <HeaderSection />
    <div class="container">
      <h2 class="section-title">Sobre ProTactics</h2>
      <div class="intro-banner">
        <p class="intro-text">Conecta, entrena y mejora con la mejor plataforma de entrenamientos.</p>
        <button class="cta-button">Únete Ahora</button>
      </div>
      
      <div class="mission-section">
        <h3 class="sub-title">Nuestra Misión</h3>
        <p class="mission-text">
          Facilitar la planificación y optimización de entrenamientos para entrenadores y deportistas, proporcionando herramientas interactivas y una comunidad activa.
        </p>
      </div>
      
      <div class="features-section">
        <h3 class="sub-title">¿Qué Ofrecemos?</h3>
        <div class="features-container">
          <div class="feature-card">
            <h4>Planificación Inteligente</h4>
            <p>Crea sesiones de entrenamiento con facilidad y accede a plantillas optimizadas.</p>
          </div>
          <div class="feature-card">
            <h4>Dashboard Interactivo</h4>
            <p>Visualiza el progreso de los entrenamientos con estadísticas en tiempo real.</p>
          </div>
          <div class="feature-card">
            <h4>Comunidad Activa</h4>
            <p>Conéctate con otros entrenadores y comparte estrategias de entrenamiento.</p>
          </div>
        </div>
      </div>
      
      <div class="team-section">
        <h3 class="sub-title">Nuestro Equipo</h3>
        <div class="team-container">
          <div class="team-card">
            <img src="../assets/img/alan.jpg" alt="Alan Teixidó" class="team-photo" />
            <h4>Alan Teixidó</h4>
            <p>Desarrollador Full Stack</p>
          </div>
          <div class="team-card">
            <img src="../assets/img/adrian.jpg" alt="Adrian Rodriguez" class="team-photo" />
            <h4>Adrian Rodriguez</h4>
            <p>Especialista en Backend</p>
          </div>
          <div class="team-card">
            <img src="../assets/img/alex.jpg" alt="Alex Martín" class="team-photo" />
            <h4>Alex Martín</h4>
            <p>Diseñador UI/UX</p>
          </div>
        </div>
      </div>
    </div>
    <FooterSection />
  </template>
  
  <script setup>
  import HeaderSection from "@/components/HeaderSection.vue";
  import FooterSection from "@/components/FooterSection.vue";
  </script>
  
  <style scoped>
  .container {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
    text-align: center;
  }
  
  .section-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #00e6e6;
  }
  
  .intro-banner {
    background: linear-gradient(90deg, #007BFF, #00e6e6);
    padding: 20px;
    border-radius: 10px;
    width: 60%;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .intro-text {
    font-size: 1.4rem;
    color: white;
    margin-bottom: 15px;
  }
  
  .cta-button {
    background-color: white;
    color: #007BFF;
    padding: 10px 20px;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  
  .cta-button:hover {
    margin-top: 5%;
    background-color: #00e6e6;
    color: white;
  }
  
  .sub-title {
    margin-top: 5%;

    font-size: 2rem;
    margin-bottom: 20px;
    color: white;
  }
  
  .mission-text {
    margin-top: 5%;
    font-size: 1.2rem;
    color: #ccc;
    max-width: 800px;
  }
  
  .features-container, .team-container {
    margin-top: 5%;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  
  .feature-card, .team-card {
    margin-top: 5%;

    background: black;
    padding: 20px;
    border-radius: 10px;
    width: 280px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .feature-card:hover, .team-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }
  
  .feature-card h4, .team-card h4 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #00e6e6;
  }
  
  .feature-card p, .team-card p {
    font-size: 1rem;
    color: #ccc;
  }
  
  .team-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
  </style>
  
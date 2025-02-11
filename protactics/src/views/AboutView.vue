<template>
    <HeaderSection />
    <div class="container">
      <h1 class="main-title">ACERCA DE PROTACTICS</h1>
      <div class="carousel">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-slide" :class="{ active: index === currentSlide }">
          <img :src="slide.image" :alt="slide.alt" class="carousel-image" />
          <div class="carousel-text">{{ slide.text }}</div>
        </div>
        <button class="carousel-btn prev" @click="prevSlide">&#10094;</button>
        <button class="carousel-btn next" @click="nextSlide">&#10095;</button>
      </div>
      
      <div class="intro-banner">
        <p class="intro-text">Optimiza tu entrenamiento y alcanza tu máximo rendimiento con nuestra plataforma innovadora.</p>
        <button class="cta-button">Empieza Ahora</button>
      </div>
      
      <div class="mission-section">
        <h2 class="sub-title">Nuestra Visión</h2>
        <p class="mission-text">
          ProTactics busca revolucionar la forma en que los entrenadores y deportistas organizan y mejoran sus entrenamientos, brindando herramientas digitales avanzadas y un entorno colaborativo.
        </p>
      </div>

      <div class="mission-section">
        <h2 class="sub-title">Nuestra Visión</h2>
        <p class="mission-text">
          ProTactics busca revolucionar la forma en que los entrenadores y deportistas organizan y mejoran sus entrenamientos, brindando herramientas digitales avanzadas y un entorno colaborativo.
        </p>
      </div>
      
      <div class="features-section">
        <h2 class="sub-title">¿Qué Nos Hace Únicos?</h2>
        <div class="features-container">
          <div class="feature-card">
            <span class="feature-icon">⚙️</span>
            <h3>Herramientas Avanzadas</h3>
            <p>Accede a herramientas interactivas para diseñar y personalizar entrenamientos a medida.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">📈</span>
            <h3>Analíticas Detalladas</h3>
            <p>Monitoriza el rendimiento con gráficos y reportes en tiempo real.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🤝</span>
            <h3>Red de Expertos</h3>
            <p>Interactúa con profesionales y comparte estrategias para mejorar cada sesión.</p>
          </div>
        </div>
      </div>
      
      <div class="team-section">
        <h2 class="sub-title">Conoce al Equipo</h2>
        <div class="team-container">
          <div class="team-card">
            <img src="../assets/img/alan.jpg" alt="Alan Teixidó" class="team-photo" />
            <h3>Alan Teixidó</h3>
            <p>Lead Developer</p>
          </div>
          <div class="team-card">
            <img src="../assets/img/adrian.jpg" alt="Adrian Rodriguez" class="team-photo" />
            <h3>Adrian Rodriguez</h3>
            <p>Backend Engineer</p>
          </div>
          <div class="team-card">
            <img src="../assets/img/alex.jpg" alt="Alex Martín" class="team-photo" />
            <h3>Alex Martín</h3>
            <p>UI/UX Designer</p>
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

.carousel {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 400px; /* Ajusta según necesidad */
  overflow: hidden;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-slide {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1.4rem;
  text-align: center;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.carousel-btn.prev {
  left: 15px;
}

.carousel-btn.next {
  right: 15px;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: black;
}
  .container {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
    text-align: center;
  }
  
  .main-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 40px;
    text-transform: uppercase;
    color: #00e6e6;
  }
  
  .intro-banner {
    background: linear-gradient(90deg, #007BFF, #00e6e6);
    padding: 30px;
    border-radius: 20px;
    width: 70%;
    text-align: center;
    margin-bottom: 50px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .intro-text {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 20px;
  }
  
  .cta-button {
    background-color: white;
    color: #007BFF;
    padding: 12px 25px;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #00e6e6;
    color: white;
  }
  
  .sub-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: white;
  }
  
  .mission-text {
    font-size: 1.2rem;
    color: #ccc;
    max-width: 800px;
  }
  
  .features-container, .team-container {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  
  .feature-card, .team-card {
    background: black;
    padding: 25px;
    border-radius: 10px;
    width: 300px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .feature-card:hover, .team-card:hover {
    transform: scale(1.08);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }
  
  .feature-card h3, .team-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #00e6e6;
  }
  
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 10px;
    display: block;
  }
  
  .team-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
  </style>

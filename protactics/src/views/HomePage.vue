<template>
  <div id="app">
    <HeaderSection></HeaderSection>
    <main>
      <div class="intro">
        <h1>PROTACTICS</h1>
        <p>¡Conecta, crea gana!</p>
        <RouterLink :to="`/login`"><button class="cta-button">Empezar</button></RouterLink>
        <img src="../assets/img/FondoHome2.png" class="popup-image" ref="image1">
      </div>
      <MainSection />
      <LogosSection />
      <Slider />
      <ThreeText />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import MainSection from '../components/MainSection.vue'
import LogosSection from '../components/LogosSection.vue'
import Slider from '../components/Slider.vue'
import ThreeText from '../components/ThreeText.vue'
import { ref, onMounted } from 'vue';

const image1 = ref(null);

 // Detectar cuando el elemento entra en la vista
 const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('popup-in-view');
      }
    });
  };
  
  onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
  
    // Observar los textos e imágenes
    observer.observe(image1.value);

  });

</script>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-top: 18%;
  margin-bottom: 20%;
  position: relative;
}

.intro h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1000%;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194)); /* Degradado de azul a verde */
  background-clip: text; /* Aplica el degradado solo al texto */
  transition: color 1s, text-shadow 1s, filter 1s;
}

.intro h1:hover {
  color: transparent;
  filter: brightness(1.2); 
  text-shadow: none;
}

.intro p {
  margin-top: -2.5rem;
  margin-bottom: 1rem;
}

img {
  width: 80%;
  position: absolute;
  z-index: -1;
  right: 6%;
}

.cta-button {
  margin-top: 5px;
  position: relative;
  display: inline-block;
  padding: 20px 30px;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid transparent;
  border-radius: 50px;
  background-image: linear-gradient(to right, #0098e5, #00a86b);
  color: white;
  text-align: center;
  cursor: pointer;
  transition: 0.4s;
  outline: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
}

.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

.cta-button:hover::before {
  transform: scale(1.3);
}

.cta-button:focus {
  outline: none;
}

  .popup-image {
    opacity: 0;
    transform: scale(0.5);  /* Inicia pequeño */
    transition: opacity 0.6s ease, transform 0.6s ease;
    margin: 20px 0;
  }
  
  .popup-image.popup-in-view {
    opacity: 1;
    transform: scale(1); /* Toma el tamaño original */
  }

</style>

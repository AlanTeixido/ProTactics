<template>
  <div id="app">
    <HeaderSection></HeaderSection>
    <main>
      <div class="intro">
        <h1>PROTACTICS</h1>
        <p>¡Conecta, crea gana!</p>
        <button class="cta-button">Empezar</button>
        <img src="../assets/img/FondoHome2.png" alt="">
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
  margin-top: -1.5rem;
}

img {
  width: 80%;
  position: absolute;
  z-index: -1;
  right: 6%;

}

.cta-button {
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 2px rgb(255, 254, 254) solid;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;
  margin-top: 1rem;
}

.cta-button:hover {
  transform: scale(1.1);
}
</style>
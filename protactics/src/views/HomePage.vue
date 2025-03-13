<template>
  <div id="app">
    <HeaderSection />
    <main>
      <div class="intro">
        <h1>PROTACTICS</h1>
        <p>¡Conecta, crea, gana!</p>
        <RouterLink :to="`/login`">
          <button class="cta-button">Empezar</button>
        </RouterLink>
        <img src="../assets/img/FondoHome2.png" class="popup-image" ref="image1" />
      </div>
      <MainSection />
      <LogosSection />
      <Slider />
      <ThreeText />
      <FormContact />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import MainSection from '@/components/MainSection.vue';
import LogosSection from '@/components/LogosSection.vue';
import Slider from '@/components/Slider.vue';
import ThreeText from '@/components/ThreeText.vue';
import FormContact from '@/components/FormContact.vue';

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
  observer.observe(image1.value);
});
</script>

<style scoped>
/* Contenedor principal */
#app {
  font-family: Arial, sans-serif;
  background-color: #1b1b1b;
  
}

/* Sección introductoria */
.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin: 10% auto;
  position: relative;
  max-width: 90%;
}

.intro h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 8rem;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194));
  background-clip: text;
  transition: color 1s, text-shadow 1s, filter 1s;
}

.intro h1:hover {
  color: transparent;
  filter: brightness(1.2);
  text-shadow: none;
}

.intro p {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Imagen de fondo */
.popup-image {
  margin-top: 8%;
  max-width: 80%;
  position: absolute;
  z-index: -1;
  right: 6%;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.popup-image.popup-in-view {
  opacity: 1;
  transform: scale(1);
}

/* Botón CTA */
.cta-button {
  padding: 15px 25px;
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

.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1200px) {
  .intro {
    margin-top: 15%;
  }

  .popup-image {
    max-width: 70%;
  }
}

@media (max-width: 992px) {
  .intro h1 {
    font-size: 5rem;
  }

  .intro p {
    font-size: 1.3rem;
  }

  .popup-image {
    max-width: 60%;
    right: 0;
  }

  .cta-button {
    padding: 12px 20px;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .intro {
    margin-top: 20%;
  }

  .intro h1 {
    font-size: 4rem;
  }

  .intro p {
    font-size: 1.2rem;
  }

  .popup-image {
    max-width: 80%;
    position: static;
    margin-top: 20px;
  }

  .cta-button {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .intro {
    margin-top: 25%;
  }

  .intro h1 {
    font-size: 3rem;
  }

  .intro p {
    font-size: 1rem;
  }

  .popup-image {
    max-width: 90%;
    margin-top: 20px;
  }

  .cta-button {
    padding: 8px 15px;
    font-size: 0.8rem;
  }
}
</style>

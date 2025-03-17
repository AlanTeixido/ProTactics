<template>
  <section class="three-text">
      <div class="text-item" ref="text1">
          <h2>Entrenamientos a tu medida</h2>
          <p>Con <span>ProTactics</span>, puedes diseñar entrenamientos que se ajusten perfectamente a tus objetivos. Ya sea que quieras mejorar tu resistencia, agilidad o fuerza, nosotros te ayudamos a planificar un camino de progreso claro y alcanzable.</p>
      </div>
      <div class="text-item" ref="text2">
          <h2>Optimización de Rendimiento</h2>
          <p>Mejora tus marcas personales con entrenamientos diseñados para maximizar tus resultados. Cada ejercicio está enfocado en desarrollar tus puntos fuertes, mientras trabajas en tus áreas de mejora para lograr un rendimiento integral.</p>
      </div>
      <div class="text-item" ref="text3">
          <h2>Planificación Flexible</h2>
          <p>La clave del éxito está en la adaptabilidad. <span>ProTactics</span> permite que ajustes tus entrenamientos según tus necesidades diarias, ya sea para prepararte para una competencia o simplemente para mantener tu forma física de manera efectiva.</p>
          <p>Ya no tendrás que preocuparte por estancarte; con la planificación flexible de <span>ProTactics</span>, siempre tendrás un entrenamiento a medida de tus objetivos y tiempos.</p>
      </div>
  </section>
</template>

<script setup>
 import { ref, onMounted } from 'vue';
  
  const text1 = ref(null);
  const text2 = ref(null);
  const text3 = ref(null);
  
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  };
  
  onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    observer.observe(text1.value);
    observer.observe(text2.value);
    observer.observe(text3.value);
  });
</script>

<style scoped>
span {
  font-weight: bold;
  font-style: italic;
  color: hsla(180, 100%, 35%, 1);
}

.text-item {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.5s, transform 0.5s ease-in-out;
  margin: 20px 0;
}

.text-item.in-view {
  opacity: 1;
  transform: translateY(0);
}

.three-text {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5%;
  padding: 5% 10%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.three-text h2 {
  margin-bottom: 10px;
}

.three-text p {
  text-align: justify;
  line-height: 160%;
  margin: 2%;
}

@media (max-width: 1024px) {
  .three-text {
    grid-template-columns: repeat(2, 1fr);
    gap: 4%;
  }
}

@media (max-width: 768px) {
  .three-text {
    grid-template-columns: 1fr;
    gap: 3%;
    padding: 5% 8%;
  }
}

@media (max-width: 480px) {
  .three-text {
    padding: 5% 5%;
  }

  .text-item {
    text-align: center;
  }
}
</style>

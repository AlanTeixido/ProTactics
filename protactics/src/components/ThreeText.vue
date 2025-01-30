<template>
    <section class="three-text">
        <div class="text-item">
            <h2>Entrenamientos a tu medida</h2>
            <p>Con ProTactics, puedes diseñar entrenamientos que se ajusten perfectamente a tus objetivos. Ya sea que quieras mejorar tu resistencia, agilidad o fuerza, nosotros te ayudamos a planificar un camino de progreso claro y alcanzable.</p>
        </div>
        <div class="text-item">
            <h2>Optimización de Rendimiento</h2>
            <p>Mejora tus marcas personales con entrenamientos diseñados para maximizar tus resultados. Cada ejercicio está enfocado en desarrollar tus puntos fuertes, mientras trabajas en tus áreas de mejora para lograr un rendimiento integral.</p>
        </div>
        <div class="text-item">
            <h2>Planificación Flexible</h2>
            <p>La clave del éxito está en la adaptabilidad. ProTactics permite que ajustes tus entrenamientos según tus necesidades diarias, ya sea para prepararte para una competencia o simplemente para mantener tu forma física de manera efectiva.</p>
            <p>Ya no tendrás que preocuparte por estancarte; con la planificación flexible de ProTactics, siempre tendrás un entrenamiento a medida de tus objetivos y tiempos.</p>
        </div>
    </section>
</template>

<script setup></script>

<style scoped>
.three-text {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 5% 10%;
  margin-top: 5%;
  margin-bottom: 5%;
  color: #fff;
  background: #121212; /* Fondo más oscuro */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* Más sombra para un mejor contraste */
  transition: transform 0.3s ease-in-out;
}

.three-text:hover {
  transform: scale(1.03);
}

.text-item {
  padding: 20px;
  background-color: #1a1a1a; /* Fondo oscuro en los bloques */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease;
}

.text-item:hover {
  background-color: #0084c2; /* Azul en hover para los bloques */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}

.text-item h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-family: 'Bebas Neue', sans-serif;
  background: linear-gradient(45deg, rgb(4, 196, 68), rgb(0, 132, 194)); 
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8); /* Sombra para hacer los textos más legibles */
  transition: text-shadow 0.3s ease;
}

.text-item h2:hover {
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 1); /* Aumenta la sombra en el hover */
}

.text-item p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #f0f0f0;
  font-weight: 300;
  transition: color 0.3s ease;
}

.text-item p:hover {
  color: rgb(0, 195, 255); /* Cambio de color de texto en hover */
}

.text-item p + p {
  margin-top: 20px;
  font-style: italic;
}
</style>

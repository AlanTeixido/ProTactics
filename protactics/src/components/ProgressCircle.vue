<template>
    <div class="circle-wrapper">
      <canvas ref="canvas" class="progress-canvas"></canvas>
      <div class="circle-text">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
  
  Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
  
  const props = defineProps({
    value: Number,
    max: { type: Number, default: 10 },
    color: { type: String, default: '#00c6ff' }
  });
  
  const canvas = ref(null);
  let chartInstance = null;
  
  const drawChart = () => {
    if (chartInstance) chartInstance.destroy();
  
    chartInstance = new Chart(canvas.value, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [props.value, props.max - props.value],
          backgroundColor: [props.color, '#1e293b'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false }
        }
      }
    });
  };
  
  onMounted(drawChart);
  watch(() => props.value, drawChart);
  watch(() => props.max, drawChart);
  </script>
  
  <style scoped>
  .circle-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  
  .progress-canvas {
    width: 100px;
    height: 100px;
    display: block;
  }
  
  .circle-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 1rem;
    color: white;
    text-align: center;
    white-space: nowrap;
  }
  </style>
  
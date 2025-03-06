<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// 🔹 Plugin personalizado para mostrar porcentaje en el centro
ChartJS.register({
  id: 'customText',
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const text = chart.options.plugins.customText.value;

    ctx.save();
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#333'; // Color del texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    ctx.restore();
  }
});

// Estado de los datos
const userStats = ref(null);
const loading = ref(true);
const errorMessage = ref("");

const caloriesData = ref({});
const performanceData = ref({});
const trainingsData = ref({});
const timeData = ref({});

// 🔹 Función para crear los datos del gráfico de dona
const createChartData = (value, total, color) => ({
  datasets: [{
    data: [value, total - value],
    backgroundColor: [color, '#E0E0E0'], // Color principal y gris para el restante
    cutout: '70%' // Tamaño del agujero central
  }],
  options: {
    responsive: true,
    plugins: {
      tooltip: { enabled: false }, // Desactivar tooltips
      legend: { display: false }, // Ocultar la leyenda
      customText: {
        value: `${Math.round((value / total) * 100)}%`, // Mostrar porcentaje en el centro
      }
    }
  },
});

// 🔹 Cargar las estadísticas del usuario
const loadUserStats = async () => {
  try {
    const response = await axios.get("https://protactics-api.onrender.com/user_stats/public");

    if (!response.data || Object.keys(response.data).length === 0) {
      errorMessage.value = "ℹ️ No hay datos disponibles.";
      userStats.value = null;
      return;
    }

    const stats = response.data;
    stats.total_time = formatTime(stats.total_time);

    userStats.value = stats;

    // Crear datos para los gráficos de dona
    caloriesData.value = createChartData(stats.total_calories, 10000, '#6C63FF');
    performanceData.value = createChartData(stats.avg_performance, 100, '#00C49F');
    trainingsData.value = createChartData(stats.total_trainings, 100, '#FFBB28');
    timeData.value = createChartData(stats.total_time, 100, '#FFC300');

  } catch (error) {
    console.error("❌ Error cargando estadísticas:", error);
    errorMessage.value = "❌ No se han podido obtener las estadísticas.";
    userStats.value = null;
  } finally {
    loading.value = false;
  }
};

// 🔹 Función para formatear el tiempo total correctamente
const formatTime = (timeString) => {
  if (!timeString || typeof timeString !== "string") return "0h 0m";

  const timeParts = timeString.split(" ");
  const hours = parseInt(timeParts[0]) || 0;
  const minutes = parseInt(timeParts[1]) || 0;

  return `${hours}h ${minutes}m`;
};

// Ejecutar la carga de datos al montar el componente
onMounted(loadUserStats);
</script>

<template>
  <div class="user-stats">
    <h3>Estadísticas Generales</h3>

    <div v-if="loading">
      <p>🔄 Cargando estadísticas...</p>
    </div>

    <div v-else-if="errorMessage">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

    <div v-else-if="userStats" class="stats-content">
      <div class="stat-box">
        <h5>🔥 Calorías Quemadas</h5>
        <Doughnut :data="caloriesData" />
      </div>
      <div class="stat-box">
        <h5>⚡ Rendimiento Medio</h5>
        <Doughnut :data="performanceData" />
      </div>
      <div class="stat-box">
        <h5>🏋️‍♂️ Entrenamientos Realizados</h5>
        <Doughnut :data="trainingsData" />
      </div>
      <div class="stat-box">
        <h5>⏳ Tiempo Total</h5>
        <Doughnut :data="timeData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-stats {
  background: #F8F9FA;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  margin-top: 10%;
}

.stats-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-box {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  width: 200px;
  text-align: center;
}

.stat-box h5 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}

.error-message {
  color: #ff3b30;
  font-size: 14px;
  font-weight: bold;
}
</style>

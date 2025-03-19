<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// 🔹 Estado de los datos
const userStats = ref(null);
const loading = ref(true);
const errorMessage = ref("");

const caloriesData = ref({});
const performanceData = ref({});
const trainingsData = ref({});
const timeData = ref({});

// 🔹 Opciones de cada gráfico
const caloriesOptions = ref({});
const performanceOptions = ref({});
const trainingsOptions = ref({});
const timeOptions = ref({});

// 🔹 Crear datos del gráfico
const createChartData = (value, total, color) => ({
  datasets: [{
    data: [value, total - value],
    backgroundColor: [color, '#e0e0e0'], // Color más suave para el fondo
    borderWidth: 0, // Sin borde para un look más limpio
    cutout: '88%'  // Grosor del anillo de la dona más delgado
  }],
  options: {
    responsive: true,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      customText: {
        value: `${Math.round((value / total) * 100)}%`,
      }
    },
    elements: {
      arc: {
        borderWidth: 0, // Eliminar borde de las secciones del gráfico
        borderRadius: 15, // Establecer bordes redondeados en los segmentos
      }
    }
  }
});

// 🔹 Crear opciones del gráfico
const createChartOptions = (value, total) => ({
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    customText: { value: `${Math.round((value / total) * 100)}%` }
  },
  elements: {
    arc: {
      borderWidth: 0,
      borderRadius: 15, // Establecer bordes redondeados en los segmentos
    }
  }
});

// 🔹 Plugin para mostrar texto en el centro del Doughnut
ChartJS.register({
  id: "customText",
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const text = chart.options.plugins.customText?.value || "";

    ctx.save();
    ctx.font = "36px Roboto, sans-serif"; // Tipografía más moderna
    ctx.fillStyle = "#00000080"; // Texto más suave
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
    ctx.restore();
  }
});

// 🔹 Cargar estadísticas
const loadUserStats = async () => {
  try {
    const response = await axios.get("https://protactics-api.onrender.com/user_stats/public");

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error("ℹ️ No hay datos disponibles.");
    }

    const stats = {
      ...response.data,
      total_calories: response.data.total_calories ?? 0,
      total_trainings: response.data.total_trainings ?? 0,
      avg_performance: response.data.avg_performance ?? 0,
      total_time_numeric: parseTotalMinutes(response.data.total_time)
    };

    userStats.value = stats;

    caloriesData.value = createChartData(stats.total_calories, 10000, "#4285f4"); // Azul de Google
    caloriesOptions.value = createChartOptions(stats.total_calories, 10000);

    performanceData.value = createChartData(stats.avg_performance, 100, "#34a853"); // Verde de Google
    performanceOptions.value = createChartOptions(stats.avg_performance, 100);

    trainingsData.value = createChartData(stats.total_trainings, 100, "#fbbc05"); // Amarillo de Google
    trainingsOptions.value = createChartOptions(stats.total_trainings, 100);

    timeData.value = createChartData(stats.total_time_numeric, 1000, "#ea4335"); // Rojo de Google
    timeOptions.value = createChartOptions(stats.total_time_numeric, 1000);

  } catch (error) {
    console.error("❌ Error cargando estadísticas:", error.message);
    errorMessage.value = "❌ No se pudieron obtener las estadísticas.";
    userStats.value = null;
  } finally {
    loading.value = false;
  }
};

// 🔹 Convertir "2h 50m" a minutos totales
const parseTotalMinutes = (timeString) => {
  if (!timeString || typeof timeString !== "string") return 0;

  const parts = timeString.match(/(\d+)h\s*(\d*)m?/);
  const hours = parts?.[1] ? parseInt(parts[1], 10) : 0;
  const minutes = parts?.[2] ? parseInt(parts[2], 10) : 0;

  return (hours * 60) + minutes;
};

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
        <h5>🔥</h5>
        <Doughnut :data="caloriesData" :options="caloriesOptions" class="grafico1"/>
      </div>
      <div class="stat-box">
        <h5>⚡</h5>
        <Doughnut :data="performanceData" :options="performanceOptions" />
      </div>
      <div class="stat-box">
        <h5>🏋️‍♂️</h5>
        <Doughnut :data="trainingsData" :options="trainingsOptions" />
      </div>
      <div class="stat-box">
        <h5>⏳</h5>
        <Doughnut :data="timeData" :options="timeOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-stats {
  width: 70%;
  border-radius: 16px;
  text-align: center;
  margin-top: 4%;
}

h3 {
  color: #202124; /* Color oscuro */
  font-size: 18px;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
}

.stats-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  align-items: center;
  margin-top: 8%;
  margin-right: 25px;
}

.stat-box {
  background: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 8%;
  text-align: center;
  width: 90%;
  height: 90%;
}

h5 {
  color: #202124;
  font-size: 10px;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-weight: bold;
}

.error-message {
  color: #ff4c4c;
  font-size: 14px;
  margin-top: 10px;
}
</style>

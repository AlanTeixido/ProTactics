<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar els components necessaris de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// 🔹 Estat de les dades
const userStats = ref(null);
const loading = ref(true);
const errorMessage = ref("");

const caloriesData = ref({});
const performanceData = ref({});
const trainingsData = ref({});
const timeData = ref({});

// 🔹 Opcions de cada gràfic (perquè el text personalitzat va aquí)
const caloriesOptions = ref({});
const performanceOptions = ref({});
const trainingsOptions = ref({});
const timeOptions = ref({});

// 🔹 Crear dades del gràfic
const createChartData = (value, total, color) => ({
  datasets: [{
    data: [value, total - value],
    backgroundColor: [color, '#fff'],
    cutout: '85%'  // Más alto = anillo más fino (prueba entre 80% y 90%)
  }],
  options: {
    responsive: true,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      customText: {
        value: `${Math.round((value / total) * 100)}%`,
      }
    }
  }
});



// 🔹 Crear opcions del gràfic (amb el text al mig)
const createChartOptions = (value, total) => ({
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    customText: { value: `${Math.round((value / total) * 100)}%` }
  }
});

// 🔹 Plugin per mostrar text al centre del Doughnut
ChartJS.register({
  id: "customText",
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const text = chart.options.plugins.customText?.value || "";

    ctx.save();
    ctx.font = "45px Montserrat";
    ctx.fillStyle = "#00000098";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
    ctx.restore();
  }
});

// 🔹 Carregar estadístiques
const loadUserStats = async () => {
  try {
    const response = await axios.get("https://protactics-api.onrender.com/user_stats/public");

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error("ℹ️ No hi ha dades disponibles.");
    }

    const stats = {
      ...response.data,
      total_calories: response.data.total_calories ?? 0,
      total_trainings: response.data.total_trainings ?? 0,
      avg_performance: response.data.avg_performance ?? 0,
      total_time_numeric: parseTotalMinutes(response.data.total_time)
    };

    userStats.value = stats;

    caloriesData.value = createChartData(stats.total_calories, 10000, "#0075d1");
    caloriesOptions.value = createChartOptions(stats.total_calories, 10000);

    performanceData.value = createChartData(stats.avg_performance, 100, "#eaca00");
    performanceOptions.value = createChartOptions(stats.avg_performance, 100);

    trainingsData.value = createChartData(stats.total_trainings, 100, "#ea6000");
    trainingsOptions.value = createChartOptions(stats.total_trainings, 100);

    timeData.value = createChartData(stats.total_time_numeric, 1000, "#83ea00");
    timeOptions.value = createChartOptions(stats.total_time_numeric, 1000);

  } catch (error) {
    console.error("❌ Error carregant estadístiques:", error.message);
    errorMessage.value = "❌ No s'han pogut obtenir les estadístiques.";
    userStats.value = null;
  } finally {
    loading.value = false;
  }
};

// 🔹 Convertir "2h 50m" a minuts totals
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
        <h5>🔥 Calorías Quemadas</h5>
        <Doughnut :data="caloriesData" :options="caloriesOptions" class="grafico1"/>
      </div>
      <div class="stat-box">
        <h5>⚡ Rendimiento Medio</h5>
        <Doughnut :data="performanceData" :options="performanceOptions" />
      </div>
      <div class="stat-box">
        <h5>🏋️‍♂️ Entrenamientos Realizados</h5>
        <Doughnut :data="trainingsData" :options="trainingsOptions" />
      </div>
      <div class="stat-box">
        <h5>⏳ Tiempo Total</h5>
        <Doughnut :data="timeData" :options="timeOptions" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.user-stats {
  background: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20%;
}

h3 {
  color: #000000b7;
  font-size: 18px;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.stat-box {
  background-color: rgba(212, 212, 212, 0.295);
  border-radius: 12px;
  padding: 8%;
  text-align: center;
  width: 75%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

h5 {
  color: #00000098;
  font-size: 14px;
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


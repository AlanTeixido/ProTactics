<template>
  <div class="motivation">
    <h4>Objectiu Mensual</h4>
    <p>Objectiu: Correr 120 km aquest mes</p>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
    <p>Progress: {{ progress }}%</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const progress = ref(0);

// Carregar el progrés de l'objectiu mensual
const loadMonthlyGoal = async () => {
try {
  const response = await axios.get("https://protactics-api.onrender.com/user_stats/monthly_goal");  // Crida a l'API sense token

  const completed = response.data.completed;
  const goal = response.data.goal;

  // Càlcul del percentatge de progrés
  progress.value = (completed / goal) * 100;
} catch (error) {
  console.error("Error carregant el progrés mensual:", error);
}
};

onMounted(loadMonthlyGoal);
</script>

<style scoped>
.motivation {
background: #2a2a2a;
padding: 15px;
border-radius: 10px;
box-shadow: 0px 5px 15px rgba(0, 255, 255, 0.2);
margin-bottom: 20px;
}

h4 {
font-size: 20px;
color: #00c3ff;
font-weight: bold;
}

.progress-bar {
background: #555;
height: 10px;
border-radius: 5px;
margin: 10px 0;
}

.progress {
background: #00c3ff;
height: 100%;
border-radius: 5px;
}
</style>

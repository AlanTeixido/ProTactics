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
  background: rgb(255, 255, 255);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(46, 46, 46, 0.13);
  text-align: center;
}

h4 {
  color: #000000b7;
  font-size: 18px;
  margin-bottom: 10px;
  text-transform: uppercase;
}

p {
  color: #494949;
  font-size: 13px;
  margin-bottom: 5px;
}

.progress-bar {
  background: rgba(214, 214, 214, 0.8);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
}

.progress {
  background: linear-gradient(90deg, #00e6e6, #00b3b3);
  height: 100%;
  transition: width 0.5s ease;
}

.progress-text {
  color: #bfbfbf;
  font-size: 12px;
  margin-top: 5px;
}

</style>

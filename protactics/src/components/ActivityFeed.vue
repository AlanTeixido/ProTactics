<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const activities = ref([]);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("🚨 No hi ha token disponible.");
    return;
  }

  try {
    const response = await axios.get("https://protactics-api.onrender.com/activity_feed", {
      headers: { Authorization: `Bearer ${token}` },
    });
    activities.value = response.data;
  } catch (error) {
    console.error("❌ Error carregant activitats recents:", error);
  }
});
</script>


<template>
  <div class="activity-feed">
    <h3>Activitats recents</h3>
    <ul>
      <li v-for="activity in activities" :key="activity.id">
        <strong>{{ activity.nombre_usuario }}:</strong> {{ activity.descripcion }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.activity-feed {
  background: #222;
  padding: 15px;
  border-radius: 8px;
  color: white;
}
</style>

<script setup>
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import Posts from "@/components/Posts.vue";
import UserStats from "@/components/UserStats.vue";
import ActivityFeed from "@/components/ActivityFeed.vue";
import LastTraining from "@/components/LastTraining.vue";
</script>

<template>
  <HeaderSection />

  <div class="dashboard-container">
    <div class="dashboard-left">
      <Posts mode="dashboard" />
    </div>

    <div class="dashboard-right">
      <UserStats />  <!-- 🔹 Aquí s'implementa UserStats -->
      <ActivityFeed />
      <LastTraining />
    </div>
  </div>

  <FooterSection />
</template>

<style scoped>
.dashboard-container {
    margin-top: 100px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.dashboard-left {
  width: 60%;
}

.dashboard-right {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

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
      <UserStats />
      <ActivityFeed />
      <LastTraining />
    </div>
  </div>

  <FooterSection />
</template>

<style scoped>
.dashboard-container {
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
}

.dashboard-left {
  width: 65%;
}

.dashboard-right {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.last-training-container, .user-stats {
  box-shadow: 0px 10px 30px rgba(0, 255, 255, 0.3);
  padding: 20px;
  border-radius: 12px;
  background: #2a2a2a;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.last-training-container:hover, .user-stats:hover {
  box-shadow: 0px 10px 25px rgba(0, 255, 255, 0.4);
  transform: translateY(-5px);
}

h3, h4 {
  font-size: 22px;
  font-weight: 600;
  color: #00c3ff;
}

.view-all-btn {
  margin-top: 10px;
  background: #00c3ff;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.view-all-btn:hover {
  background: #0099cc;
  transform: scale(1.05);
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .dashboard-left, .dashboard-right {
    width: 100%;
  }

  .view-all-btn {
    width: 100%;
    margin-top: 15px;
  }
}


</style>

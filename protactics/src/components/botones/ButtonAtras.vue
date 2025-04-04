<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
</script>
<template>
    <div>
        <img src="../../assets/img/izquierda.png" @click="goBack" class="back">
    </div>
</template>
<style scoped>
  .back{
    width: 30px;
    height: 30px;
  }
</style>
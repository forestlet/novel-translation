<script setup lang="ts">
import Header from '@/components/Header.vue'

</script>

<template>
  <Header />
  <el-scrollbar height="calc(100vh - 64px)" class="main">
    <router-view>
    </router-view>
  </el-scrollbar>
</template>

<style>

</style>

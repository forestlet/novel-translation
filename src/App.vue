<script setup lang="ts">
import Header from '@/components/Header.vue'

</script>

<template>
  <Header />
  <div class="main">
    <router-view>
    </router-view>
  </div>
</template>

<style>
.main {
  overflow: auto;
  margin-top: 56px;

}

@media only screen and (max-width: 400px) {
  .main {
    margin-top: 100px;
  }
}
</style>

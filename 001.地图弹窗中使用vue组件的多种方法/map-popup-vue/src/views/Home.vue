<template>
  <div style="display: flex;height: 100vh;width: 100vw;flex-direction: column">
    <link-header></link-header>
    <router-view style="flex:1"></router-view>
  </div>
</template>

<script setup>
import LinkHeader from "../components/linkHeader.vue";
</script>

<style scoped></style>

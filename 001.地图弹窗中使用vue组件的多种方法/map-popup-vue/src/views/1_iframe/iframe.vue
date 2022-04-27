<template>
  <div>
    <span>接受传进来的值为:</span>
    <span>{{ route.query.id }}</span>
  </div>
  <div>这种方法真简单</div>
</template>

<script setup>
import {useRoute} from 'vue-router'

const route = useRoute();
</script>

<style scoped>

</style>
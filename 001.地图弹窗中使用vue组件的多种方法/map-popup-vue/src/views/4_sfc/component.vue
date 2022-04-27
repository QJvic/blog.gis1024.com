<template>
  <div>
    <span>接受传进来的值为:</span>
    <span>{{ props["jId"] }}</span>
  </div>
  <div>这种方法最推荐</div>
</template>

<script setup>
const props = defineProps(['jId']);
</script>

<style scoped>

</style>
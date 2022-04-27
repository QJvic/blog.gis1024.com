<template>
  <div>
    <span>接受传进来的值为:</span>
    <span>{{ props.id }}</span>
  </div>
  <div>这种方法也很简单</div>
</template>

<script setup>
const props = defineProps(['id']);
</script>

<style scoped>

</style>
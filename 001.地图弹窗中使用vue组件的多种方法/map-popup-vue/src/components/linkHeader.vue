<template>
  <div class="wrap">
    <router-link to="/1">方法1:嵌套iframe</router-link>
    <router-link to="/2">方法2:vue模板字符串创建vue实例</router-link>
    <router-link to="/3">方法3:使用.vue单文件创建vue实例</router-link>
    <router-link to="/4">方法4:使用vue3新方法defineCustomElement</router-link>
  </div>
</template>

<style scoped>
.wrap > * {
  margin: 0 20px;
  white-space: nowrap;
}
</style>

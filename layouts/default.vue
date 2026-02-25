<!-- layouts/default.vue -->
<template>
  <div class="app-wrapper">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
// 布局组件通过 auto-import 自动引入 AppHeader / AppFooter
</script>

<style lang="less">
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
}
</style>

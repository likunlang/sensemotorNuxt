<!-- error.vue -->
<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">{{ error?.statusCode || 404 }}</div>
      <h1 class="error-title">{{ errorMessage }}</h1>
      <p class="error-desc">
        <template v-if="error?.statusCode === 404">
          The page you're looking for doesn't exist or has been moved.
        </template>
        <template v-else>
          Something went wrong. Please try again later.
        </template>
      </p>
      <div class="error-actions">
        <NuxtLink to="/" class="btn btn-primary">
          Back to Home
        </NuxtLink>
        <button class="btn btn-outline" @click="handleError">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: Object,
})

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) return 'Page Not Found'
  if (props.error?.statusCode === 500) return 'Server Error'
  return props.error?.statusMessage || 'An Error Occurred'
})

const handleError = () => clearError({ redirect: '/' })

// SEO for error pages
useSeoMeta({
  title: `${errorMessage.value} | SenseMotor`,
  robots: 'noindex',
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  padding: 20px;
}
.error-container {
  text-align: center;
  max-width: 500px;
}
.error-code {
  font-size: 96px;
  font-weight: 900;
  color: #e8e8e8;
  line-height: 1;
  margin-bottom: 16px;
}
.error-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}
.error-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
}
.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s;
  border: 2px solid transparent;
  cursor: pointer;
}
.btn-primary {
  background: #1677ff;
  color: #fff;
  &:hover { background: #4096ff; }
}
.btn-outline {
  border-color: #1677ff;
  color: #1677ff;
  background: transparent;
  &:hover { background: #1677ff; color: #fff; }
}
</style>

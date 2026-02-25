// plugins/client-only.client.ts
// 仅在客户端运行的初始化逻辑（文件名带 .client 后缀自动标识）

export default defineNuxtPlugin(() => {
  // 客户端特有初始化，如 scrollReveal 等 DOM 依赖库
  // 在页面组件中通过 onMounted + import() 动态加载即可
})

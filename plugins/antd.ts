// plugins/antd.ts
// ant-design-vue SSR 兼容插件
import Antd from 'ant-design-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd)
})

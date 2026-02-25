// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  // ✅ SSR 开启（核心SEO配置）
  ssr: true,

  // 兼容性日期
  compatibilityDate: '2024-11-01',

  // 运行时环境变量
  runtimeConfig: {
    // 服务端私有变量
    apiSecret: '',
    // 公共变量（客户端也可访问）
    public: {
      cdnUrl: process.env.NUXT_PUBLIC_CDN_URL || 'https://assets.senseautos.com',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://sensemotor.com',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'SenseMotor - Electric Commercial Vehicle Solutions',
    }
  },

  // 模块
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  // @nuxt/image 配置
  image: {
    domains: ['assets.senseautos.com'],
  },

  // i18n 配置
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'zh-CN', language: 'zh-CN', name: '简体中文' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    vueI18n: './i18n.config.ts',
  },

  // 全局 CSS
  css: [
    'ant-design-vue/dist/reset.css',
    '~/assets/css/var.less',
    '~/assets/css/font.css',
    '~/assets/css/main.less',
    '~/assets/css/main0.less',
    '~/assets/css/main1.less',
    '~/assets/css/tailwind.css',
  ],

  // Vite 配置
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/assets/css/var.less";`,
        },
      },
    },
    // 优化 ant-design-vue SSR
    optimizeDeps: {
      include: ['ant-design-vue', 'dayjs'],
    },
  },

  // 构建优化
  build: {
    transpile: ['ant-design-vue', '@ant-design/icons-vue'],
  },

  // app head 全局默认值
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'SenseMotor - Electric Commercial Vehicle Solutions',
      meta: [
        { name: 'description', content: 'SenseMotor is the exclusive regional official representative for Dongfeng and Wuling New Energy Vehicles in Central and Eastern Europe.' },
        { name: 'keywords', content: 'electric vehicle, commercial van, e-van, electric truck, SenseMotor, Dongfeng, Wuling, Eastern Europe' },
        { property: 'og:site_name', content: 'SenseMotor' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        {
          rel: 'preconnect',
          href: 'https://assets.senseautos.com',
        },
      ],
      script: [
        // 全局 SVG Icon
        {
          src: 'https://assets.senseautos.com/resource/icons/iconfont.js',
          defer: true,
        },
      ],
    },
  },

  // 服务端代理（开发环境）
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://sensemotor.com/api',
        changeOrigin: true,
        prependPath: false,
      },
    },
    // 生产构建时路由规则
    routeRules: {
      // 首页：ISR，每小时重新生成
      '/': { isr: 3600 },
      // 产品页：ISR
      '/product/**': { isr: 3600 },
      // 关于我们：静态生成
      '/aboutus': { prerender: true },
      // Why Electric：ISR
      '/why_electric': { isr: 3600 },
      // 新闻详情：ISR
      '/news/**': { isr: 1800 },
      // 品牌页：ISR
      '/brand/**': { isr: 3600 },
      // API 路由不缓存
      '/api/**': { cache: false },
    },
  },

  // TypeScript 严格模式
  typescript: {
    strict: false,
    typeCheck: false,
  },
})

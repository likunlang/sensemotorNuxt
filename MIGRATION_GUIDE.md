# SenseMotor - Nuxt 3 SSR 迁移完整指南

## 📁 新项目结构

```
sensemotor-nuxt3/
├── app.vue                    # 根组件
├── nuxt.config.ts             # Nuxt 核心配置（含SSR/ISR/路由规则）
├── error.vue                  # 自定义错误/404页面
├── .env                       # 开发环境变量
├── .env.production            # 生产环境变量
│
├── pages/                     # 📌 约定式文件路由（自动生成路由）
│   ├── index.vue              → /              （首页）
│   ├── aboutus.vue            → /aboutus       （关于我们）
│   ├── why_electric.vue       → /why_electric  （为何选择电动）
│   ├── product/
│   │   └── [id].vue           → /product/:id   （产品详情，动态路由）
│   ├── news/
│   │   └── [id].vue           → /news/:id      （新闻详情，动态路由）
│   └── brand/
│       └── [id].vue           → /brand/:id     （品牌详情，动态路由）
│
├── layouts/
│   └── default.vue            # 默认布局（含 Header + Footer）
│
├── components/                # 全局自动导入组件
│   ├── AppHeader.vue          # 导航头（SSR安全）
│   ├── AppFooter.vue          # 页脚
│   ├── ContactForm.vue        # 联系表单
│   └── ProductsSwiper.vue     # 产品轮播（ClientOnly）
│
├── composables/               # 全局自动导入 Composable
│   ├── useSeo.ts              # 统一SEO meta管理
│   ├── useApi.ts              # 统一API请求
│   └── useScrollReveal.ts     # SSR安全滚动动画
│
├── stores/                    # Pinia Store
│   └── products.ts            # 产品数据store
│
├── utils/                     # 工具函数（全局自动导入）
│   ├── newsData.ts            # 新闻列表数据
│   ├── newsDetail.ts          # 新闻详情数据（⚠️ 需从原项目复制完整内容）
│   └── brandsData.ts          # 品牌数据
│
├── server/
│   ├── api/
│   │   └── contact.post.ts    # 联系表单接口
│   └── routes/
│       ├── sitemap.xml.ts     # 动态Sitemap生成
│       └── robots.txt.ts      # robots.txt
│
├── locales/
│   └── lang/
│       ├── en.ts              # 英文翻译
│       └── zh_CN.ts           # 中文翻译
│
├── assets/
│   └── css/
│       ├── main.less          # 全局样式
│       └── var.less           # Less变量
│
└── plugins/
    ├── antd.ts                # ant-design-vue SSR注册
    └── client-only.client.ts  # 仅客户端插件
```

---

## 🚀 快速开始

### 1. 安装依赖

```bash
cd sensemotor-nuxt3
npm install
```

### 2. 启动开发服务器（SSR模式）

```bash
npm run dev
# 访问 http://localhost:3000
# 直接查看 HTML 源码（Ctrl+U），确认内容已服务端渲染
```

### 3. 构建生产版本

```bash
# SSR 构建（需要 Node.js 服务器）
npm run build

# 静态站点生成（SSG）
npm run generate
```

### 4. 预览生产版本

```bash
npm run preview
```

---

## ⚠️ 迁移前必须完成的步骤

### 步骤 1：复制新闻详情数据

将原项目 `src/store/newsDetail.ts` 的完整数据复制到：

```
utils/newsDetail.ts
```

### 步骤 2：复制资产文件

将原项目 `src/assets/` 下的 CSS 和图片复制到新项目：

```bash
# 原项目 src/assets/css/ → 新项目 assets/css/（合并，不覆盖）
# 原项目 public/ → 新项目 public/（favicon.ico等）
```

### 步骤 3：补全产品数据

在 `stores/products.ts` 中补全所有产品数据（G105-3、E-STAR_T3 等型号的完整信息）。

### 步骤 4：配置邮件服务

在 `server/api/contact.post.ts` 中接入邮件发送服务：

```bash
# 推荐使用 Resend（免费额度大）
npm install resend

# 或 Nodemailer
npm install nodemailer
```

---

## 🔑 核心迁移对照表

| 原项目（Vite+Vue3） | 新项目（Nuxt3） | 说明 |
|---|---|---|
| `src/views/home/index.vue` | `pages/index.vue` | 约定式路由，自动 `GET /` |
| `src/views/product/index.vue` | `pages/product/[id].vue` | 动态路由 `/product/:id` |
| `src/views/news/detail.vue` | `pages/news/[id].vue` | 动态路由 `/news/:id` |
| `src/router/basic.ts` | `pages/` 目录结构 | 文件即路由，无需手写 |
| `src/store/productListData.ts` | `stores/products.ts` | Pinia store + composable |
| `getAppEnvConfig()` | `useRuntimeConfig()` | Nuxt内建环境变量系统 |
| `document.title = ...` | `useSeoMeta({ title })` | SSR安全的meta注入 |
| `import.meta.env.VITE_*` | `runtimeConfig.public.*` | Nuxt环境变量规范 |
| `onMounted(() => scrollReveal())` | `useScrollReveal('.selector')` | SSR安全封装 |
| `<script src="...iconfont.js">` | `nuxt.config.ts app.head.script` | 全局脚本注入 |

---

## 🔍 SEO 功能清单

本次迁移实现的 SEO 增强：

- ✅ **SSR 全页面服务端渲染**——谷歌爬虫直接抓取完整 HTML
- ✅ **每页动态 SEO Meta**——title/description/keywords/OG/Twitter Card 均在服务端注入
- ✅ **结构化数据（JSON-LD）**——Organization、Product、Article、BreadcrumbList
- ✅ **Canonical URL**——每页自动注入 `<link rel="canonical">`
- ✅ **动态 Sitemap**——访问 `/sitemap.xml` 自动生成，含产品和文章页
- ✅ **robots.txt**——访问 `/robots.txt` 自动生成
- ✅ **语义化 HTML**——`<article>`、`<section>`、`<header>`、`<nav>` 等标签
- ✅ **图片 alt 属性**——所有图片包含描述性 alt 文本
- ✅ **ISR 增量静态再生**——产品/文章页每小时重新生成
- ✅ **面包屑导航结构**——文章页包含 BreadcrumbList Schema
- ✅ **404 页面**——`noindex` 处理，避免爬虫抓取错误页面
- ✅ **Core Web Vitals 优化**——图片懒加载、视频 preload="none"、CSS 按需加载

---

## 🚢 部署方案

### 方案 A：Node.js 服务器（推荐 SSR）

```bash
npm run build
# 产物在 .output/
node .output/server/index.mjs
```

推荐部署平台：**Vercel**、**Railway**、**Render**、**自托管 PM2**

### 方案 B：Docker 部署

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY .output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
```

### 方案 C：完全静态（SSG）

```bash
npm run generate
# 产物在 dist/，直接部署到 CDN/Nginx/Vercel Static
```

> 注意：SSG 模式下动态 API 路由（联系表单）将不可用，需改为第三方服务。

---

## 📈 预期 SEO 改善

| 指标 | 改善前（CSR） | 改善后（SSR） |
|---|---|---|
| Google 抓取内容 | JavaScript 执行后 | 即时完整 HTML |
| 首屏内容（FCP） | 需等待 JS 加载 | 服务端直接输出 |
| 页面 Title/Description | JS 动态注入 | HTML `<head>` 直接包含 |
| 产品页 Schema | 无 | Product 结构化数据 |
| 文章页 Schema | 无 | Article + Breadcrumb |
| Sitemap | 无 | 动态生成，自动更新 |
| 图片 SEO | 部分缺失 alt | 完整描述性 alt 文本 |

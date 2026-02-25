<!-- pages/index.vue -->
<template>
  <div class="home_wrapper">
    <!-- Hero 视频 Banner -->
    <section class="hero-section" aria-label="Hero Banner">
      <ClientOnly>
        <video
          class="hero-video"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          :poster="`${cdnUrl}/resource/images/home_banner_poster.webp`"
        >
          <source :src="`${cdnUrl}/resource/video/banner.mp4`" type="video/mp4" />
        </video>
      </ClientOnly>
      <div class="hero-overlay">
        <div class="hero-content sense_container">
          <h1 class="hero-title home_add">
            Pioneer in Electric<br />Commercial Vehicle Solutions
          </h1>
          <p class="hero-subtitle home_add">
            Exclusive Regional Representative for Dongfeng & Wuling New Energy Vehicles in Central and Eastern Europe
          </p>
          <div class="hero-actions home_add">
            <NuxtLink to="/product/E-STAR_V9" class="btn btn-primary">
              Explore Products
            </NuxtLink>
            <NuxtLink to="/#contact_us" class="btn btn-outline">
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示 Swiper -->
    <section class="products-section home_add" aria-labelledby="products-heading">
      <div class="sense_container">
        <h2 id="products-heading" class="section-title">Our Electric Vehicles</h2>
        <p class="section-desc">Discover our complete range of electric commercial vehicles</p>
      </div>
      <ClientOnly>
        <ProductsSwiper :products="allProducts" />
      </ClientOnly>
      <!-- SSR 静态产品列表（爬虫可见） -->
      <noscript>
        <div class="products-static-list">
          <article
            v-for="product in allProducts"
            :key="product.id"
            class="product-card-static"
          >
            <h3>
              <NuxtLink :to="`/product/${product.id}`">{{ product.name }}</NuxtLink>
            </h3>
            <p>{{ product.type }} | GVW: {{ product.GVW }} | Range: {{ product.Range }}</p>
          </article>
        </div>
      </noscript>
    </section>

    <!-- 品牌介绍 -->
    <section class="brands-section" aria-labelledby="brands-heading">
      <div class="sense_container">
        <h2 id="brands-heading" class="section-title home_add">Our Brand Partners</h2>
        <div class="brand-list">
          <article
            v-for="brand in brandsListData"
            :key="brand.id"
            class="brand-item home_add"
          >
            <NuxtLink :to="`/brand/${brand.id}`">
              <NuxtImg
                :src="brand.logo"
                :alt="`${brand.name} - Electric Commercial Vehicle Brand`"
                width="200"
                height="80"
                loading="lazy"
              />
              <h3>{{ brand.name }}</h3>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Why Electric 摘要 -->
    <section class="why-section home_add" aria-labelledby="why-heading">
      <div class="sense_container">
        <div class="why-inner">
          <div class="why-text">
            <h2 id="why-heading">Why Electric Commercial Vehicles?</h2>
            <p>
              2026 marks the pivotal year for Europe's commercial electric vehicle transformation.
              With CO₂ regulations enforcing compliance and total ownership costs dropping below diesel,
              electric vans and trucks deliver unmatched efficiency for urban and regional delivery.
            </p>
            <NuxtLink to="/why_electric" class="btn btn-primary mt-4">
              Learn More →
            </NuxtLink>
          </div>
          <div class="why-image">
            <NuxtImg
              :src="`${cdnUrl}/resource/images/why_electric_home.webp`"
              alt="Electric vehicle in urban delivery"
              width="600"
              height="400"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section id="contact_us" class="contact-section home_add" aria-labelledby="contact-heading">
      <div class="sense_container">
        <h2 id="contact-heading" class="section-title">Get In Touch</h2>
        <ContactForm />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '~/stores/products'
import { getBrandsListData } from '~/utils/brandsData'

const config = useRuntimeConfig()
const cdnUrl = config.public.cdnUrl
const productStore = useProductStore()
const allProducts = computed(() => productStore.allProducts)
const brandsListData = getBrandsListData()

// ✅ SSR SEO - 在服务端渲染时注入完整 meta
useSeo({
  title: 'SenseMotor - Pioneer in Electric Commercial Vehicle Solutions',
  description: 'SenseMotor is the exclusive regional official representative for Dongfeng and Wuling New Energy Vehicles in Central and Eastern Europe. Explore our e-Van and e-Truck range.',
  keywords: 'electric commercial vehicle, e-van, electric truck, Dongfeng, Wuling, Eastern Europe, SenseMotor',
  image: `${cdnUrl}/resource/images/og_home.webp`,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SenseMotor',
    url: 'https://sensemotor.com',
    logo: `${cdnUrl}/resource/images/logo_header.webp`,
    description: 'Exclusive Regional Official Representative for Dongfeng and Wuling New Energy Vehicles in Central and Eastern Europe.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40-762-075-103',
      contactType: 'customer service',
      email: 'info@sensemotor.com',
    },
    address: [
      { '@type': 'PostalAddress', addressCountry: 'RO', addressLocality: 'București' },
      { '@type': 'PostalAddress', addressCountry: 'HU', addressLocality: 'Budapest' },
    ],
    sameAs: ['https://www.linkedin.com/company/sensemotor'],
  },
})

// 客户端滚动动画
useScrollReveal('.home_add')
</script>

<style lang="less" scoped>
// Hero
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background: #000;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}
.hero-overlay {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
.hero-content {
  color: #fff;
  padding-top: 65px;
}
.hero-title {
  font-size: clamp(28px, 5vw, 60px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}
.hero-subtitle {
  font-size: clamp(14px, 2vw, 20px);
  max-width: 600px;
  margin-bottom: 40px;
  opacity: 0.9;
}
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

// Buttons
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s;
  border: 2px solid transparent;
  &.btn-primary {
    background: #1677ff;
    color: #fff;
    &:hover { background: #4096ff; }
  }
  &.btn-outline {
    border-color: #fff;
    color: #fff;
    &:hover { background: #fff; color: #000; }
  }
  &.mt-4 { margin-top: 16px; }
}

// Sections
.section-title {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
}
.section-desc {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
}

.products-section {
  padding: 80px 0;
}

.brands-section {
  padding: 80px 0;
  background: #f5f5f5;
}
.brand-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}
.brand-item {
  text-align: center;
  a { text-decoration: none; color: inherit; }
  h3 { font-size: 16px; margin-top: 8px; }
  img { max-height: 80px; object-fit: contain; }
}

.why-section {
  padding: 80px 0;
}
.why-inner {
  display: flex;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
}
.why-text {
  flex: 1;
  min-width: 280px;
  h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 700; margin-bottom: 16px; }
  p { font-size: 16px; line-height: 1.8; color: #555; }
}
.why-image {
  flex: 1;
  min-width: 280px;
  img { width: 100%; border-radius: 12px; }
}

.contact-section {
  padding: 80px 0;
  background: #f9f9f9;
}

.products-static-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 40px;
}
.product-card-static {
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 8px;
  min-width: 200px;
  h3 a { text-decoration: none; color: #333; }
}
</style>

<!-- pages/product/[id].vue -->
<template>
  <div class="childpage_wrapper product_wrapper">
    <!-- 加载态 -->
    <div v-if="!product" class="product-not-found">
      <h1>Product Not Found</h1>
      <NuxtLink to="/">Back to Home</NuxtLink>
    </div>

    <template v-else>
      <!-- Banner -->
      <section class="product-banner" :aria-label="`${product.name} banner`">
        <NuxtImg
          :src="product.bannerImg"
          :alt="`${product.name} - ${product.type} Electric Commercial Vehicle`"
          class="banner-img"
          width="1920"
          height="800"
          loading="eager"
          fetchpriority="high"
        />
        <div class="banner-overlay">
          <div class="sense_container">
            <h1 class="product-name">{{ product.name }}</h1>
            <p class="product-type">{{ product.type }}</p>
          </div>
        </div>
      </section>

      <!-- 产品规格 -->
      <section class="product-specs" aria-labelledby="specs-heading">
        <div class="sense_container">
          <h2 id="specs-heading" class="section-title">Specifications</h2>
          <div class="specs-grid">
            <div class="spec-item">
              <dt class="spec-label">Vehicle Size</dt>
              <dd class="spec-value">{{ product.size }} mm</dd>
            </div>
            <div class="spec-item">
              <dt class="spec-label">Gross Vehicle Weight</dt>
              <dd class="spec-value">{{ product.GVW }}</dd>
            </div>
            <div class="spec-item">
              <dt class="spec-label">Battery Capacity</dt>
              <dd class="spec-value">{{ product.Battery }}</dd>
            </div>
            <div class="spec-item">
              <dt class="spec-label">Range (WLTP)</dt>
              <dd class="spec-value">{{ product.Range }}</dd>
            </div>
          </div>
        </div>
      </section>

      <!-- 产品外观图 -->
      <section class="product-gallery" aria-labelledby="gallery-heading">
        <div class="sense_container">
          <h2 id="gallery-heading" class="section-title">Gallery</h2>
          <div class="gallery-grid">
            <NuxtImg
              :src="product.outlightImg"
              :alt="`${product.name} exterior view`"
              class="gallery-img"
              width="800"
              height="500"
              loading="lazy"
            />
            <NuxtImg
              :src="product.infoTable"
              :alt="`${product.name} specification table`"
              class="gallery-img"
              width="800"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <!-- 产品视频 -->
      <section v-if="product.videoSrc" class="product-video-section" aria-labelledby="video-heading">
        <div class="sense_container">
          <h2 id="video-heading" class="section-title">Product Video</h2>
          <ClientOnly>
            <video
              class="product-video"
              controls
              preload="none"
              :poster="product.bannerImg"
            >
              <source :src="product.videoSrc" type="video/mp4" />
              <p>Your browser does not support HTML5 video. <a :href="product.videoSrc">Download video</a>.</p>
            </video>
          </ClientOnly>
        </div>
      </section>

      <!-- 询盘表单 -->
      <section id="contact_us" class="product-contact" aria-labelledby="contact-heading">
        <div class="sense_container">
          <h2 id="contact-heading" class="section-title">Request Information</h2>
          <ContactForm :product-name="product.name" />
        </div>
      </section>

      <!-- 相关产品 -->
      <section class="related-products" aria-labelledby="related-heading">
        <div class="sense_container">
          <h2 id="related-heading" class="section-title">Other Products</h2>
          <div class="related-grid">
            <article
              v-for="related in relatedProducts"
              :key="related.id"
              class="related-card"
            >
              <NuxtLink :to="`/product/${related.id}`">
                <NuxtImg
                  :src="related.slideImg"
                  :alt="`${related.name} electric vehicle`"
                  width="400"
                  height="260"
                  loading="lazy"
                />
                <div class="related-card-body">
                  <h3>{{ related.name }}</h3>
                  <p>{{ related.type }} · {{ related.Range }}</p>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '~/stores/products'

const route = useRoute()
const productStore = useProductStore()
const config = useRuntimeConfig()

// 通过动态路由参数获取产品
const productId = computed(() => route.params.id as string)
const product = computed(() => productStore.getProductById(productId.value))

// 相关产品（排除当前）
const relatedProducts = computed(() =>
  productStore.allProducts.filter((p) => p.id !== productId.value).slice(0, 3),
)

// ✅ 404 处理
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product Not Found' })
}

// ✅ 完整的产品页 SEO
if (product.value) {
  const p = product.value
  useSeo({
    title: `${p.name} - ${p.type} Electric Commercial Vehicle`,
    description: `${p.name} is a ${p.type} electric commercial vehicle with ${p.Battery} battery, ${p.Range} range, and ${p.GVW} GVW. Available in Central and Eastern Europe through SenseMotor.`,
    keywords: `${p.name}, electric ${p.type.toLowerCase()}, ${p.GVW} electric van, ${p.Battery} battery, ${p.Range} range, SenseMotor`,
    image: p.bannerImg,
    type: 'product',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: `${p.type} electric commercial vehicle with ${p.Battery} battery capacity and ${p.Range} WLTP range.`,
      image: [p.bannerImg, p.outlightImg],
      brand: {
        '@type': 'Brand',
        name: 'SenseMotor',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'Dongfeng / Wuling',
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Vehicle Size', value: p.size },
        { '@type': 'PropertyValue', name: 'GVW', value: p.GVW },
        { '@type': 'PropertyValue', name: 'Battery', value: p.Battery },
        { '@type': 'PropertyValue', name: 'Range', value: p.Range },
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'SenseMotor',
        },
      },
    },
  })
}

// ✅ 生成静态路径（用于 nuxt generate / prerender）
definePageMeta({
  // 可选：布局覆盖
})
</script>

<style lang="less" scoped>
.product-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
  h1 { font-size: 28px; }
  a { color: #1677ff; }
}

.product-banner {
  position: relative;
  height: 70vh;
  min-height: 400px;
  overflow: hidden;
  background: #000;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding-bottom: 60px;
}
.product-name {
  color: #fff;
  font-size: clamp(28px, 5vw, 56px);
  font-weight: 700;
  margin-bottom: 8px;
}
.product-type {
  color: rgba(255,255,255,0.8);
  font-size: 18px;
  margin: 0;
}

.section-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}

.product-specs {
  padding: 80px 0;
  background: #f9f9f9;
}
.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}
.spec-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}
.spec-label {
  display: block;
  color: #999;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.spec-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.product-gallery {
  padding: 80px 0;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.gallery-img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.product-video-section {
  padding: 80px 0;
  background: #f9f9f9;
}
.product-video {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: block;
  border-radius: 12px;
  background: #000;
}

.product-contact {
  padding: 80px 0;
}

.related-products {
  padding: 80px 0;
  background: #f9f9f9;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.related-card {
  a { text-decoration: none; color: inherit; }
  img { width: 100%; border-radius: 8px 8px 0 0; object-fit: cover; }
}
.related-card-body {
  padding: 16px;
  background: #fff;
  border-radius: 0 0 8px 8px;
  border: 1px solid #eee;
  border-top: none;
  h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
  p { color: #888; font-size: 13px; margin: 0; }
}
</style>

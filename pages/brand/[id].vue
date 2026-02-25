<!-- pages/brand/[id].vue -->
<template>
  <div class="childpage_wrapper brand-page">
    <div v-if="!brand" class="not-found">
      <h1>Brand Not Found</h1>
      <NuxtLink to="/why_electric">← Back</NuxtLink>
    </div>

    <template v-else>
      <!-- Brand Intro -->
      <section class="brand-intro" aria-labelledby="brand-heading">
        <div class="brand-container">
          <div class="introduce content-box">
            <div class="img-box">
              <NuxtImg
                :src="brand.images?.[0]"
                :alt="`${brand.name} electric vehicle`"
                width="600"
                height="400"
                loading="eager"
              />
            </div>
            <div class="content-inner">
              <NuxtImg
                class="intro_logo"
                :src="brand.logo"
                :alt="`${brand.name} logo`"
                width="200"
                height="60"
                loading="eager"
              />
              <h1 id="brand-heading" class="brand-title">{{ brand.name }}</h1>
              <p class="brand-desc">{{ brand.description }}</p>
              <NuxtLink to="/#contact_us" class="btn btn-primary">
                Inquire Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Brand Video -->
      <section v-if="brand.videoSrc" class="brand-video-section">
        <div class="brand-container">
          <h2 class="section-title">Brand Video</h2>
          <ClientOnly>
            <video
              class="brand-video"
              controls
              preload="none"
              :poster="brand.images?.[0]"
            >
              <source :src="brand.videoSrc" type="video/mp4" />
            </video>
          </ClientOnly>
        </div>
      </section>

      <!-- Related Products -->
      <section class="related-products" aria-labelledby="products-heading">
        <div class="brand-container">
          <h2 id="products-heading" class="section-title">{{ brand.name }} Products</h2>
          <div class="products-grid">
            <article
              v-for="product in brandProducts"
              :key="product.id"
              class="product-card"
            >
              <NuxtLink :to="`/product/${product.id}`">
                <NuxtImg
                  :src="product.slideImg"
                  :alt="`${product.name} - ${brand.name} electric vehicle`"
                  width="400"
                  height="260"
                  loading="lazy"
                />
                <div class="product-card-body">
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.type }} · {{ product.Range }}</p>
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
import { getBrandsListData } from '~/utils/brandsData'
import { useProductStore } from '~/stores/products'

const route = useRoute()
const config = useRuntimeConfig()
const cdnUrl = config.public.cdnUrl
const productStore = useProductStore()
const brandsListData = getBrandsListData()

const brandId = computed(() => route.params.id as string)
const brand = computed(() => brandsListData.find((b) => b.id === brandId.value))

if (!brand.value) {
  throw createError({ statusCode: 404, statusMessage: 'Brand Not Found' })
}

// 该品牌的产品（根据 brandId 过滤，可扩展产品数据中加 brandId 字段）
const brandProducts = computed(() => productStore.allProducts.slice(0, 4))

// ✅ SEO
if (brand.value) {
  const b = brand.value
  useSeo({
    title: `${b.name} - Electric Commercial Vehicles | SenseMotor`,
    description: b.description || `${b.name} electric commercial vehicles available through SenseMotor in Central and Eastern Europe.`,
    keywords: `${b.name}, electric vehicle brand, EV dealer Europe, ${b.name} van, ${b.name} truck`,
    image: b.images?.[0] || `${cdnUrl}/resource/images/og_default.webp`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Brand',
      name: b.name,
      description: b.description,
      logo: b.logo,
      url: `https://sensemotor.com/brand/${b.id}`,
    },
  })
}
</script>

<style lang="less" scoped>
.brand-page { padding-top: 65px; }
.brand-container { max-width: 1300px; margin: 0 auto; padding: 0 40px; }
.brand-intro { padding: 60px 0; }
.content-box {
  display: flex;
  gap: 60px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.img-box { width: 45%; min-width: 280px; img { width: 100%; border-radius: 12px; } }
.content-inner { flex: 1; min-width: 280px; }
.intro_logo { height: 50px; width: auto; margin-bottom: 20px; }
.brand-title { font-size: clamp(22px, 3.5vw, 36px); font-weight: 700; margin-bottom: 16px; }
.brand-desc { font-size: 16px; line-height: 1.8; color: #555; margin-bottom: 32px; }
.btn-primary {
  display: inline-flex;
  align-items: center;
  background: #1677ff;
  color: #fff;
  padding: 12px 32px;
  border-radius: 40px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: #4096ff; }
}
.brand-video-section { padding: 60px 0; background: #f9f9f9; }
.section-title { font-size: clamp(20px, 2.5vw, 28px); font-weight: 700; text-align: center; margin-bottom: 32px; }
.brand-video { width: 100%; max-width: 900px; margin: 0 auto; display: block; border-radius: 12px; background: #000; }
.related-products { padding: 60px 0; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card {
  a { text-decoration: none; color: inherit; display: block; border-radius: 8px; overflow: hidden; border: 1px solid #eee; transition: box-shadow 0.2s; &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); } }
  img { width: 100%; aspect-ratio: 3/2; object-fit: cover; }
}
.product-card-body { padding: 16px; h3 { font-size: 15px; font-weight: 700; margin-bottom: 4px; } p { color: #888; font-size: 13px; margin: 0; } }
.not-found { text-align: center; padding: 120px 0; h1 { font-size: 28px; margin-bottom: 16px; } a { color: #1677ff; } }

@media (max-width: 768px) {
  .img-box { width: 100%; }
  .brand-container { padding: 0 20px; }
}
</style>

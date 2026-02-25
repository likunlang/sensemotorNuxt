<!-- components/ProductsSwiper.vue -->
<!-- 此组件只在客户端运行，用 ClientOnly 包裹 -->
<template>
  <div class="products-swiper-wrapper">
    <div class="swiper-container" ref="swiperEl">
      <div class="swiper-wrapper">
        <div
          v-for="product in products"
          :key="product.id"
          class="swiper-slide"
        >
          <NuxtLink :to="`/product/${product.id}`" class="product-slide-link">
            <div class="product-slide-img-box">
              <img
                :src="product.slideImg"
                :alt="`${product.name} - ${product.type} electric vehicle`"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="product-slide-info">
              <h3 class="product-slide-name">{{ product.name }}</h3>
              <p class="product-slide-type">{{ product.type }}</p>
              <dl class="product-slide-specs">
                <div class="spec-row">
                  <dt>Range</dt>
                  <dd>{{ product.Range }}</dd>
                </div>
                <div class="spec-row">
                  <dt>GVW</dt>
                  <dd>{{ product.GVW }}</dd>
                </div>
                <div class="spec-row">
                  <dt>Battery</dt>
                  <dd>{{ product.Battery }}</dd>
                </div>
              </dl>
              <span class="product-slide-cta">View Details →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <!-- Navigation -->
      <div class="swiper-button-next" aria-label="Next product"></div>
      <div class="swiper-button-prev" aria-label="Previous product"></div>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/stores/products'

defineProps<{ products: Product[] }>()

const swiperEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!swiperEl.value) return
  const { Swiper } = await import('swiper')
  const { Navigation, Pagination, Autoplay, A11y } = await import('swiper/modules')
  await import('swiper/css')
  await import('swiper/css/navigation')
  await import('swiper/css/pagination')
  await import('swiper/css/autoplay')

  new Swiper(swiperEl.value, {
    modules: [Navigation, Pagination, Autoplay, A11y],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous product',
      nextSlideMessage: 'Next product',
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1440: { slidesPerView: 4 },
    },
  })
})
</script>

<style lang="less" scoped>
.products-swiper-wrapper {
  padding: 0 40px 60px;
  position: relative;
}
.swiper-container {
  overflow: hidden;
  padding-bottom: 48px;
}
.product-slide-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  background: #fff;
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    transform: translateY(-4px);
  }
}
.product-slide-img-box {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f5f5f5;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
    .product-slide-link:hover & { transform: scale(1.04); }
  }
}
.product-slide-info {
  padding: 20px;
}
.product-slide-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}
.product-slide-type {
  color: #888;
  font-size: 13px;
  margin-bottom: 16px;
}
.product-slide-specs {
  margin: 0 0 16px;
}
.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child { border-bottom: none; }
  dt { color: #999; font-size: 12px; font-weight: normal; }
  dd { font-size: 13px; font-weight: 600; color: #333; margin: 0; }
}
.product-slide-cta {
  display: inline-block;
  color: #1677ff;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s;
  .product-slide-link:hover & { color: #4096ff; }
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #1677ff;
  &::after { font-size: 20px; }
}
:deep(.swiper-pagination-bullet-active) {
  background: #1677ff;
}
</style>

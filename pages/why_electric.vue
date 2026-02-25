<!-- pages/why_electric.vue -->
<template>
  <div class="childpage_wrapper why_wrapper news_wrapper">
    <!-- Hero Section -->
    <section class="featured-area">
      <div class="why_container">
        <div class="row">
          <div class="col-12 lg:col-6">
            <h1 class="featured-area__title">
              Why<br />Electric Vehicle<br />Makes Sense?
            </h1>
          </div>
          <div class="col-12 lg:col-6">
            <p class="featured-area__content">
              2026 marks the pivotal year for Europe's commercial electric vehicle transformation—the
              ultimate window for logistics fleets to strategically deploy and lead the shift.
              With CO₂ regulations enforcing compliance, charging infrastructure maturing rapidly,
              and total ownership costs dropping below diesel, electric vans and trucks deliver
              unmatched efficiency for urban and regional delivery.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Article -->
    <div class="img-with-text image-left" v-if="headerItem">
      <div class="why_container">
        <div class="img-with-text__inner">
          <div class="left-column">
            <div class="img-with-text__content">
              <div class="img-with-text__icon">
                <NuxtImg
                  :src="`${cdnUrl}/resource/images/featured_icon.webp`"
                  alt="Featured article icon"
                  width="70"
                  height="70"
                  loading="lazy"
                />
              </div>
              <h2 class="img-with-text__title">{{ headerItem.title }}</h2>
              <p class="img-with-text__description">{{ headerItem.description }}</p>
              <div class="img-with-text__buttons">
                <NuxtLink :to="`/news/${headerItem.id}`" class="btn btn-success">
                  2-min read
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="right-column">
            <NuxtImg
              :src="headerItem.image"
              :alt="`${headerItem.title} - Electric vehicle article`"
              width="784"
              height="500"
              class="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- News Grid -->
    <section class="latest-blog" aria-labelledby="articles-heading">
      <div class="latest-blog__container">
        <div class="latest-blog__header">
          <h2 id="articles-heading" class="latest-blog__title">Got 2 Minutes?</h2>
          <p class="latest-blog__description">
            Quick reads on the electric revolution in commercial transport
          </p>
        </div>

        <div class="news-grid">
          <article
            v-for="item in listData"
            :key="item.id"
            class="news-card col-item"
          >
            <NuxtLink :to="`/news/${item.id}`" class="news-card__link">
              <div class="news-card__image">
                <NuxtImg
                  :src="item.image"
                  :alt="`${item.title} - Electric vehicle news`"
                  width="400"
                  height="260"
                  loading="lazy"
                />
                <span v-if="item.category" class="news-card__badge">{{ item.category }}</span>
              </div>
              <div class="news-card__body">
                <h3 class="news-card__title">{{ item.title }}</h3>
                <p class="news-card__desc">{{ item.description }}</p>
                <time class="news-card__date" :datetime="item.createDate">{{ item.createDate }}</time>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Brand Partners -->
    <section class="brand-section" aria-labelledby="brands-heading">
      <div class="why_container">
        <h2 id="brands-heading" class="section-title">Our Brand Partners</h2>
        <div class="brand-list">
          <article v-for="brand in brandsListData" :key="brand.id" class="brand-item">
            <NuxtLink :to="`/brand/${brand.id}`">
              <NuxtImg
                :src="brand.logo"
                :alt="`${brand.name} electric vehicle brand`"
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
  </div>
</template>

<script lang="ts" setup>
import { getNewsListData } from '~/utils/newsData'
import { getBrandsListData } from '~/utils/brandsData'

const brandsListData = getBrandsListData()

const config = useRuntimeConfig()
const cdnUrl = config.public.cdnUrl
const newsListData = getNewsListData();
// 服务端数据处理
const headerItem = computed(() => newsListData.find((i) => i.id === '202511250918') || null)
const listData = computed(() =>
  newsListData
    .filter((i) => i.id !== '202511250918')
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))
    .slice(0, 9),
)

// ✅ SEO
useSeo({
  title: 'Why Electric Commercial Vehicles Make Sense | SenseMotor',
  description: "2026 is the pivotal year for Europe's electric commercial vehicle transformation. Learn why electric vans and trucks are the future of logistics in Central and Eastern Europe.",
  keywords: 'why electric vehicle, electric van benefits, EV logistics Europe, CO2 regulations commercial vehicles, electric truck total cost ownership',
  image: `${cdnUrl}/resource/images/why_electric_og.webp`,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Why Electric Commercial Vehicles Make Sense',
    description: 'Discover why electric commercial vehicles are transforming European logistics in 2026.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sensemotor.com' },
        { '@type': 'ListItem', position: 2, name: 'Why Electric', item: 'https://sensemotor.com/why_electric' },
      ],
    },
  },
})
</script>

<style lang="less" scoped>
.why_container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}
.featured-area {
  padding-top: 120px;
  padding-bottom: 60px;
}
.featured-area__title {
  font-size: clamp(24px, 4vw, 42px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}
.featured-area__content {
  font-size: 18px;
  line-height: 1.7;
  color: #555;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.col-12 { width: 100%; }

.img-with-text { padding: 40px 0; }
.img-with-text__inner {
  display: flex;
  gap: 60px;
  align-items: center;
  flex-wrap: wrap;
}
.left-column, .right-column {
  flex: 1;
  min-width: 280px;
}
.img-with-text__title {
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  margin: 16px 0;
}
.img-with-text__description {
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 24px;
}
.btn-success {
  display: inline-flex;
  align-items: center;
  background: #1677ff;
  color: #fff;
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: #4096ff; }
}

.latest-blog { padding: 60px 0; }
.latest-blog__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}
.latest-blog__title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: 8px;
}
.latest-blog__description {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}
.news-card__link {
  text-decoration: none;
  color: inherit;
  display: block;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
}
.news-card__image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
  .news-card__link:hover & img { transform: scale(1.03); }
}
.news-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #68786a;
  color: #fff;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
}
.news-card__body {
  padding: 16px;
  background: #fff;
}
.news-card__title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 8px;
  color: #1a1a1a;
}
.news-card__desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-card__date {
  font-size: 12px;
  color: #999;
}

.brand-section {
  padding: 80px 0;
  background: #f5f5f5;
}
.section-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
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
  h3 { font-size: 15px; margin-top: 8px; font-weight: 600; }
}

@media (min-width: 1024px) {
  .lg\:col-6 { width: calc(50% - 20px); }
  .img-with-text__inner {
    .left-column { order: 1; }
    .right-column { order: 2; }
  }
}
</style>

<!-- pages/news/[id].vue -->
<template>
  <div class="childpage_wrapper news_detail_wrapper news_wrapper">
    <div class="content_block">
      <div class="second_page news_detail_content news_content">
        <div class="news_container">
          <div v-if="pending" class="loading-skeleton">
            <a-skeleton active :paragraph="{ rows: 8 }" />
          </div>
          <article v-else-if="newsItem" class="news_detail">
            <!-- 返回按钮 -->
            <div class="back-btn-wrap">
              <NuxtLink to="/why_electric" class="back-btn">
                &lt;&nbsp;&nbsp;{{ $t('index.common.back') }}
              </NuxtLink>
            </div>

            <!-- 文章头部 -->
            <header class="article-header">
              <h1 class="article-title">{{ newsItem.title }}</h1>
              <div class="article-meta">
                <time :datetime="newsItem.createDate" class="article-date">
                  {{ $t('index.common.date') }}：{{ newsItem.createDate }}
                </time>
              </div>
              <p v-if="newsItem.description" class="article-description">
                {{ newsItem.description }}
              </p>
            </header>

            <!-- 文章正文 -->
            <div class="article-body">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="text_cont" v-html="newsItem.content" />
            </div>

            <!-- 相关文章 -->
            <footer class="article-footer">
              <h2 class="related-title">Related Articles</h2>
              <div class="related-news-grid">
                <article
                  v-for="related in relatedNews"
                  :key="related.id"
                  class="related-news-card"
                >
                  <NuxtLink :to="`/news/${related.id}`">
                    <NuxtImg
                      :src="related.image"
                      :alt="`${related.title}`"
                      width="300"
                      height="200"
                      loading="lazy"
                    />
                    <div class="related-news-body">
                      <h3>{{ related.title }}</h3>
                      <time :datetime="related.createDate">{{ related.createDate }}</time>
                    </div>
                  </NuxtLink>
                </article>
              </div>
            </footer>
          </article>

          <div v-else class="not-found">
            <h1>Article Not Found</h1>
            <NuxtLink to="/why_electric">Browse All Articles</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getNewsListData, getRandomItems } from '~/utils/newsData'
import getNewsDetailData from '~/utils/newsDetail'

const route = useRoute()
const config = useRuntimeConfig()
const cdnUrl = config.public.cdnUrl

const articleId = computed(() => route.params.id as string)

const newsListData = getNewsListData();

// 服务端获取文章
const { data: newsItem, pending } = await useAsyncData(
  `news-${articleId.value}`,
  () => {
    const detail = getNewsDetailData().find((i) => i.id === articleId.value)
    if (!detail) return null
    return Promise.resolve(detail)
  },
  { server: true },
)

// 404 处理
if (!newsItem.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article Not Found' })
}

// 相关文章（随机3篇）
const relatedNews = computed(() => getRandomItems(newsListData, articleId.value, 3))

// ✅ SEO
if (newsItem.value) {
  const article = newsItem.value
  useSeo({
    title: `${article.title} | SenseMotor`,
    description: article.description || article.title,
    keywords: `${article.title}, electric vehicle news, EV logistics, SenseMotor`,
    image: article.image || `${cdnUrl}/resource/images/og_default.webp`,
    type: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: article.image,
      datePublished: article.createDate,
      dateModified: article.createDate,
      author: {
        '@type': 'Organization',
        name: 'SenseMotor',
        url: 'https://sensemotor.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SenseMotor',
        logo: {
          '@type': 'ImageObject',
          url: `${cdnUrl}/resource/images/logo_header.webp`,
        },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sensemotor.com' },
          { '@type': 'ListItem', position: 2, name: 'Why Electric', item: 'https://sensemotor.com/why_electric' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `https://sensemotor.com/news/${article.id}` },
        ],
      },
    },
  })
}
</script>

<style lang="less" scoped>
.news_container {
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 20px 60px;
}
.loading-skeleton { padding: 40px 0; }
.back-btn-wrap { margin-bottom: 24px; }
.back-btn {
  display: inline-flex;
  align-items: center;
  background: #1677ff;
  color: #fff;
  padding: 8px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
  &:hover { background: #4096ff; }
}
.article-header {
  border-bottom: 3px solid #f2d0b0;
  padding-bottom: 24px;
  margin-bottom: 32px;
}
.article-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 12px;
}
.article-meta {
  display: flex;
  gap: 16px;
  color: #888;
  font-size: 13px;
  margin-bottom: 16px;
}
.article-description {
  font-size: 16px;
  color: #555;
  line-height: 1.7;
}
.article-body {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  :deep(img) { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }
  :deep(h2) { font-size: 22px; font-weight: 700; margin: 32px 0 16px; }
  :deep(h3) { font-size: 18px; font-weight: 700; margin: 24px 0 12px; }
  :deep(p) { margin-bottom: 16px; }
  :deep(ul), :deep(ol) { padding-left: 24px; margin-bottom: 16px; }
  :deep(li) { margin-bottom: 6px; }
  :deep(a) { color: #1677ff; }
  :deep(blockquote) {
    border-left: 4px solid #f2d0b0;
    padding-left: 16px;
    color: #555;
    margin: 24px 0;
    font-style: italic;
  }
}
.article-footer {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
}
.related-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
}
.related-news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.related-news-card {
  a { text-decoration: none; color: inherit; display: block; border-radius: 8px; overflow: hidden; border: 1px solid #eee; transition: box-shadow 0.2s; &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); } }
  img { width: 100%; aspect-ratio: 16/10; object-fit: cover; }
}
.related-news-body {
  padding: 12px;
  background: #fff;
  h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; line-height: 1.4; }
  time { font-size: 12px; color: #999; }
}
.not-found {
  text-align: center;
  padding: 80px 0;
  h1 { font-size: 28px; margin-bottom: 16px; }
  a { color: #1677ff; }
}
</style>

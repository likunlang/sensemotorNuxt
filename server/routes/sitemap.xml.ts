// server/routes/sitemap.xml.ts
// 动态生成 sitemap.xml，SEO 必备
import { getNewsListData } from '~/utils/newsData'
import { useProductStore } from '~/stores/products'

export default defineEventHandler((event) => {
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://sensemotor.com'
  const now = new Date().toISOString().split('T')[0]

  // 静态页面
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/why_electric', priority: '0.9', changefreq: 'weekly' },
    { url: '/aboutus', priority: '0.8', changefreq: 'monthly' },
  ]

  // 产品页（从本地数据生成）
  const productIds = ['E-STAR_V9', 'E-STAR_V5', 'G105-3', 'E-STAR_T3']
  const productPages = productIds.map((id) => ({
    url: `/product/${id}`,
    priority: '0.9',
    changefreq: 'weekly',
  }))

  // 新闻页
  const newsPages = getNewsListData().map((news) => ({
    url: `/news/${news.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: news.createDate || now,
  }))

  const allPages = [...staticPages, ...productPages, ...newsPages]

  const urlItems = allPages
    .map((page) => `
    <url>
      <loc>${siteUrl}${page.url}</loc>
      <lastmod>${page.lastmod || now}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlItems}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'max-age=3600, s-maxage=3600')

  return xml
})

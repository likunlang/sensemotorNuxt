// composables/useSeo.ts
/**
 * 统一 SEO Meta 管理 Composable
 * 在每个页面调用此函数即可注入完整的 SEO 信息
 */
interface SeoOptions {
  title: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  structuredData?: Record<string, any>
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const route = useRoute()

  const {
    title,
    description = 'SenseMotor is the exclusive regional official representative for Dongfeng and Wuling New Energy Vehicles in Central and Eastern Europe.',
    keywords = 'electric vehicle, commercial van, electric truck, SenseMotor',
    image = `${config.public.cdnUrl}/resource/images/og_default.webp`,
    url = `${config.public.siteUrl}${route.path}`,
    type = 'website',
    noindex = false,
    structuredData,
  } = options

  const fullTitle = title.includes('SenseMotor') ? title : `${title} | SenseMotor`

  useSeoMeta({
    title: fullTitle,
    description,
    keywords,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: type,
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
  })

  // Canonical URL
  useHead({
    link: [
      { rel: 'canonical', href: url },
    ],
    ...(structuredData && {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData),
        },
      ],
    }),
  })
}

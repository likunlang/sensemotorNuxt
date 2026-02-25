// utils/brandsData.ts
// 从原项目 src/store/productListData.ts 中的品牌数据迁移

export interface BrandItem {
  id: string
  name: string
  description: string
  logo: string
  images?: string[]
  videoSrc?: string
}

// 改为函数形式，在函数内部使用 useRuntimeConfig()
export const getBrandsListData = (): BrandItem[] => {
  const config = useRuntimeConfig();
  const CDN = config.public.cdnUrl;
  
  return [
    {
      id: 'dongfeng',
      name: 'Dongfeng',
      description:
        'Dongfeng Motor Corporation is one of China\'s largest automobile manufacturers, with decades of experience in commercial vehicles. Their electric lineup represents the cutting edge of Chinese EV technology, combining reliability with innovation.',
      logo: `${CDN}/resource/brands/logo_dongfeng.webp`,
      images: [
        `${CDN}/resource/brands/dongfeng_banner.webp`,
        `${CDN}/resource/brands/dongfeng_van.webp`,
      ],
      videoSrc: `${CDN}/resource/video/dongfeng_brand.mp4`,
    },
    {
      id: 'wuling',
      name: 'Wuling',
      description:
        'SAIC-GM-Wuling (SGMW) is a joint venture renowned for producing practical, cost-effective commercial vehicles. Their electric commercial vehicle range has transformed urban logistics across Asia and is now making its mark in Europe.',
      logo: `${CDN}/resource/brands/logo_wuling.webp`,
      images: [
        `${CDN}/resource/brands/wuling_banner.webp`,
        `${CDN}/resource/brands/wuling_van.webp`,
      ],
      videoSrc: `${CDN}/resource/video/wuling_brand.mp4`,
    },
  ]
}

// utils/newsData.ts
// 从原项目 src/store/newsListData.ts 完整迁移
// Nuxt3 中 utils/ 目录下的文件可自动导入，无需手动 import

export interface NewsItem {
  id: string
  title: string
  description?: string
  image?: string
  createDate: string
  weight?: number
}

// 从原项目 src/store/newsListData.ts 迁移的完整数据
// CDN_URL 在 Nuxt3 中通过 useRuntimeConfig() 获取
export const getNewsListData = (): NewsItem[] => {
  const config = useRuntimeConfig();
  const CDN_URL = config.public.cdnUrl;

  return [
    {
      id: '202601141317',
      title: 'Eastern European Fleet Case Studies: Do Electric Trucks Deliver \u20ac150,000+ in Savings',
      description: 'Amid stricter environmental policies and volatile fuel prices in Eastern Europe, Total Cost of Ownership (TCO) is key for logistics fleet owners updating fleets. Once seen as "high-cost alternatives", electric trucks are gaining attention. Below is a dialogue between a senior new energy commercial vehicle R&D expert and Eastern European fleet owner rep Mr. Ivan, focusing on electric truck TCO',
      createDate: "2026-01-14 13:17",
      image: CDN_URL + '/resource/news/news_20260114_04.webp',
      weight: 7,
    },
    {
      id: '202601131301',
      title: 'The Last-Mile Delivery Revolution\uff1aDiesel to ECVs',
      description: 'The "last mile" of delivery \u2014 the final leg from a local hub to the customer\u2019s doorstep \u2014 is the most critical, costly, and challenging segment of logistics. As e-commerce demand soars, with 60% of consumers now expecting same-day delivery, the pressure on urban logistics is immense.',
      createDate: "2026-01-13 13:01",
      image: CDN_URL + '/resource/news/news_20260114_05.webp',
      weight: 6,
    },
    {
      id: '202512162057',
      title: 'Worried about significant battery loss in winter for new energy vehicles? This article reveals the truth.',
      description: "If you're hesitating to purchase a new energy commercial vehicle due to concerns about winter battery performance, this article can help. Please read on. According to McKinsey\u2019s 2024 European consumer survey, over 36% of potential buyers are concerned about winter range loss in new energy vehicles, ranking alongside price and charging convenience as a top-three concern. So, what is the actual situation now?",
      createDate: "2025-12-16 20:57",
      image: CDN_URL + '/resource/news/news_20251216_09.webp',
      weight: 5,
    },
    {
      id: '202512162047',
      title: 'Guide to Choosing New Energy Commercial Vehicles: What Should You Pay Attention to?',
      description: "Now, the EU is accelerating the electrification of commercial vehicles. Light new energy commercial vehicles (e-Vans and e-Light Trucks, typically with a load capacity of 1\u20133.5 tons) have become ideal choices for logistics distribution and supermarket restocking.",
      createDate: "2025-12-13 20:47",
      image: CDN_URL + '/resource/news/news_20251216_10.webp',
      weight: 4,
    },
    {
      id: '202512161558',
      title: 'Europe\u2019s New Energy Commercial Vehicle Transformation Revolution: 2026-2027 Outlook\u2014From Pilot to Acceleration',
      description: "The period from 2023 to 2025 established a solid foundation for Europe\u2019s new energy commercial vehicle transformation, covering electric light commercial vehicles (e-LCVs/e-Vans) and heavy-duty electric trucks. Market share grew slowly in 2023-2024, with e-LCV sales increasing by approximately 30-40%, though overall penetration remained below 10%.",
      createDate: "2025-12-08 15:58",
      image: CDN_URL + '/resource/news/news_20251216_03.webp',
      weight: 3,
    },
    {
      id: '202512161554',
      title: 'Electric Vehicle Maintenance Costs Only One-Third of Gas Cars? Unveiling the Truth',
      description: "As the penetration of new energy vehicles (especially pure electric vehicles) continues to rise in 2025, many owners are discovering that the most pleasant surprise after purchasing a car isn\u2019t the fast acceleration or quiet operation, but the surprisingly low maintenance costs. Multiple authoritative data sources indicate that the annual maintenance costs for new energy vehicles are often only one-third to one-half of those for traditional fuel vehicles, or even lower.",
      createDate: "2025-12-06 15:54",
      image: CDN_URL + '/resource/news/news_20251216_07.webp',
      weight: 2,
    },
    {
      id: '202512161549',
      title: 'Is New Energy Commercial Vehicles Less Safe Than Fuel-Powered Commercial Vehicles?',
      description: 'Evidence shows that modern new energy commercial vehicles are already very safe, even surpassing traditional fuel-powered vehicles in several key safety indicators. Here\u2019s a breakdown of their safety performance across different aspects',
      createDate: "2025-12-03 15:49",
      image: CDN_URL + '/resource/news/news_20251216_04.webp',
      weight: 1,
    },
    {
      id: '202511250918',
      title: "Electric Vans Really Are Less Expensive in Europe in 2026: Here\u2019s Why",
      description: "Switching to electric vans (EVs) might seem pricey upfront, but in 2026, they\u2019re often cheaper long-term than diesel vans across Europe. With lower fuel, maintenance costs, and generous incentives, EVs can save up to 25% per km in total cost of ownership (TCO), potentially \u20ac13.1 billion for businesses by 2030.",
      createDate: "2025-11-25 09:18",
      image: CDN_URL + '/resource/news/news_G050.webp',
      weight: 999,
    },
  ];
};

/**
 * 获取随机文章（排除当前文章），用于"More Articles"推荐
 */
export function getRandomItems(list: NewsItem[], excludeId: string, count = 3): NewsItem[] {
  const filtered = list.filter((i) => i.id !== excludeId)
  const shuffled = [...filtered].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
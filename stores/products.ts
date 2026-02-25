// stores/products.ts
import { defineStore } from 'pinia'
import { computed } from 'vue';
export interface Product {
  id: string
  name: string
  type: string
  size?: string
  size_with_box?: string
  size_chassis?: string
  GVW?: string
  Battery: string
  Range: string
  L2?: string
  slideImg: string
  bannerImg: string
  outlightImg?: string
  infoTable: string
  formImg: string
  videoSrc: string
}

export interface ProductGroup {
  id: string
  name: string
  menuType?: string
  children: Product[]
}

export const useProductStore = defineStore('products', () => {
  const config = useRuntimeConfig()
  const CDN = config.public.cdnUrl

  const productList = computed<ProductGroup[]>(() => [
    {
      id: 'e-Van',
      name: 'e-Van',
      menuType: 'group',
      children: [
        {
          id: 'E-STAR_V9',
          name: 'E-STAR V9',
          type: 'Big Van',
          size: '5995*2036*2590',
          GVW: '3.5T',
          Battery: '100.96kWh',
          Range: '300km',
          slideImg: `${CDN}/resource/products/slide_E-STAR_V9.webp`,
          bannerImg: `${CDN}/resource/products/product_E-STAR_V9.webp`,
          outlightImg: `${CDN}/resource/products/product_sub_E-STAR_V9.webp`,
          infoTable: `${CDN}/resource/products/product_detail_E-STAR_V9.webp`,
          formImg: `${CDN}/resource/products/product_E-STAR_V9.webp`,
          videoSrc: `${CDN}/resource/video/V9.mp4`,
        },
        {
          id: 'E-STAR_V5',
          name: 'E-STAR V5',
          type: 'Medium Van',
          size: '5270*1730*1980',
          GVW: '3.0T',
          Battery: '41.86kWh',
          Range: '260km',
          slideImg: `${CDN}/resource/products/slide_E-STAR_V5.webp`,
          bannerImg: `${CDN}/resource/products/product_E-STAR_V5.webp`,
          outlightImg: `${CDN}/resource/products/product_sub_E-STAR_V5.webp`,
          infoTable: `${CDN}/resource/products/product_detail_E-STAR_V5.webp`,
          formImg: `${CDN}/resource/products/product_E-STAR_V5.webp`,
          videoSrc: `${CDN}/resource/video/V5.mp4`,
        },
        {
          id: 'G105-3',
          name: 'G105-3',
          type: 'Medium Van',
          size: '4525*1610*1900',
          GVW: '2.5T',
          Battery: '41.86kWh',
          Range: '252km',
          slideImg: `${CDN}/resource/products/slide_G105-3.webp`,
          bannerImg: `${CDN}/resource/products/product_G105-3.webp`,
          outlightImg: `${CDN}/resource/products/product_sub_G105-3.webp`,
          infoTable: `${CDN}/resource/products/product_detail_G105-3.webp`,
          formImg: `${CDN}/resource/products/product_G105-3.webp`,
          videoSrc: `${CDN}/resource/video/G105-3.mp4`,
        },
        {
          id: "G050-L",
          name: 'G050-L',
          type: "Small Van",
          size: "3395*1475*1950",
          GVW: "1.67T",
          Battery: "29.67kWh",
          Range: "162km",
          slideImg: `${CDN}/resource/products/slide_G050-L.webp`,
          bannerImg: `${CDN}/resource/products/product_G050-L.webp`,
          infoTable: `${CDN}/resource/products/product_detail_G050-L.webp`,
          formImg: `${CDN}/resource/products/product_G050-L.webp`,
          videoSrc: `${CDN}/resource/video/G050.mp4`,
        },
      ],
    },
    {
      id: 'e-Light_Truck',
      name: 'e-Light Truck',
      menuType: 'group',
      children: [
        {
          id: "E-STAR_T",
          name: 'E-STAR T',
          type: "Medium Truck",
          size_with_box: "5750*1770*2670",
          size_chassis: "5500*1650*1750",
          GVW: "3.5T",
          Battery: "66.8kWh",
          Range: "250km",
          slideImg: `${CDN}/resource/products/slide_E-STAR_T.webp`,
          bannerImg: `${CDN}/resource/products/product_E-STAR_T.webp`,
          outlightImg: `${CDN}/resource/products/product_sub_E-STAR_T.webp`,
          infoTable: `${CDN}/resource/products/product_detail_E-STAR_T.webp`,
          formImg: `${CDN}/resource/products/product_E-STAR_T.webp`,
          videoSrc: `${CDN}/resource/video/T.mp4`,
        },
        {
          id: "G050P-L",
          name: 'G050P-L',
          type: "Small Truck",
          size: "3695*1475*1980",
          GVW: "1.6T",
          Battery: "29.67kWh",
          Range: "210km",
          slideImg: `${CDN}/resource/products/slide_G050P-L.webp`,
          bannerImg: `${CDN}/resource/products/product_G050P-L.webp`,
          infoTable: `${CDN}/resource/products/product_detail_G050P-L.webp`,
          formImg: `${CDN}/resource/products/product_G050P-L.webp`,
          videoSrc: `${CDN}/resource/video/G050.mp4`,
        },
      ],
    },
  {
    id: 'e-Tractor',
    name: 'e-Tractor',
    menuType: 'group',
    children: [
      {
        id: 'Sany_SE636',
        name: 'Sany SE636',
        type: 'e-Tractor',
        size: '6890*2545*3870',
        Battery: '636kWh',
        Range: '500km',
        L2: 'AEB/LKA/LCC/LDW/FCW/DMS/360° Camera ',
        slideImg: `${CDN}/resource/products/slide_Sany_SE636.webp`,
        bannerImg: `${CDN}/resource/products/product_Sany_SE636.webp`,
        infoTable: `${CDN}/resource/products/product_detail_Sany_SE636.webp`,
        formImg: `${CDN}/resource/products/product_Sany_SE636.webp`,
        videoSrc: `${CDN}/resource/video/Sany_SE636.mp4`,
      },
    ]
  },
  ])

  // 扁平化所有产品
  const allProducts = computed<Product[]>(() =>
    productList.value.flatMap((group) => group.children),
  )

  function getProductById(id: string): Product | undefined {
    return allProducts.value.find((p) => p.id === id)
  }

  // 生成菜单树（用于 header 导航）
  const menuItems = computed(() =>
    productList.value.map((group) => ({
      key: group.id,
      label: group.name,
      title: group.name,
      type: group.menuType,
      children: group.children.map((p) => ({
        key: p.id,
        label: p.name,
        title: p.name,
        path: `/product/${p.id}`,
      })),
    })),
  )

  return {
    productList,
    allProducts,
    menuItems,
    getProductById,
  }
})

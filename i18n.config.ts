export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      index: {
        routes: {
          home: 'Home',
          why: 'Why Electric',
          products: 'Products',
          about: 'About Us',
          news: 'News',
        },
        common: {
          contact: 'Contact',
          email: 'Email',
          whatsapp: 'WhatsApp',
          back: 'Back',
          date: 'Date',
          readMore: 'Read More',
          viewDetails: 'View Details',
          learnMore: 'Learn More',
        },
        footer: {
          contactUs: 'Contact Us',
          address: 'Address',
          followUs: 'Follow Us',
          rights: 'All Rights Reserved.',
        },
      },
    },
    'zh-CN': {
      index: {
        routes: {
          home: '首页',
          why: '为何选择电动',
          products: '产品',
          about: '关于我们',
          news: '新闻',
        },
        common: {
          contact: '联系我们',
          email: '邮箱',
          whatsapp: 'WhatsApp',
          back: '返回',
          date: '日期',
          readMore: '阅读更多',
          viewDetails: '查看详情',
          learnMore: '了解更多',
        },
        footer: {
          contactUs: '联系我们',
          address: '地址',
          followUs: '关注我们',
          rights: '版权所有。',
        },
      },
    }
  }
}))

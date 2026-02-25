export default defineNuxtPlugin((nuxtApp) => {
  const messages = {
    en: {
      index: {
        routes: { home: 'Home', why: 'Why Electric', products: 'Products', about: 'About Us' },
        common: { contact: 'Contact', email: 'Email', whatsapp: 'WhatsApp' },
        footer: { contactUs: 'Contact Us', rights: 'All Rights Reserved.' }
      }
    }
  }

  return {
    provide: {
      t: (key: string) => {
        const keys = key.split('.')
        let value: any = messages.en
        for (const k of keys) {
          if (value && value[k]) {
            value = value[k]
          } else {
            return key
          }
        }
        return value
      }
    }
  }
})

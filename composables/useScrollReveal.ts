// composables/useScrollReveal.ts
/**
 * SSR 安全的 ScrollReveal 封装
 * 仅在客户端 onMounted 后执行
 */
export function useScrollReveal(selector: string, options?: object) {
  onMounted(async () => {
    const ScrollReveal = (await import('scrollreveal')).default
    const sr = ScrollReveal()
    sr.reveal(selector, {
      reset: false,
      distance: '40px',
      duration: 500,
      origin: 'bottom',
      easing: 'ease',
      scale: 1,
      opacity: 0,
      delay: 100,
      ...options,
    })
  })
}

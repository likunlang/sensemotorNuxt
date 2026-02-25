<!-- components/AppHeader.vue -->
<template>
  <header
    :class="[
      'all_header scroll_header',
      isBlackHeader ? 'newsPage' : '',
      !isScrollTop ? 'sticky' : '',
    ]"
  >
    <div class="sense_container header-container clearfix">
      <!-- Logo -->
      <div class="logo" style="cursor: pointer">
        <NuxtLink to="/" aria-label="SenseMotor Home">
          <NuxtImg
            :src="`${cdnUrl}/resource/images/logo_header.webp`"
            alt="SenseMotor Logo"
            width="160"
            height="50"
            loading="eager"
          />
        </NuxtLink>
      </div>

      <!-- PC 导航 -->
      <nav class="navigation" aria-label="Main navigation">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.key" class="nav-item">
            <template v-if="item.children">
              <a-popover placement="bottom" :overlay-class-name="'nav-dropdown'">
                <template #content>
                  <div class="nav-dropdown-content">
                    <template v-for="group in item.children" :key="group.key">
                      <div class="nav-group-title">{{ group.label }}</div>
                      <NuxtLink
                        v-for="sub in group.children"
                        :key="sub.key"
                        :to="sub.path"
                        class="nav-dropdown-item"
                      >
                        {{ sub.label }}
                      </NuxtLink>
                    </template>
                  </div>
                </template>
                <span
                  :class="['nav-link', isActiveNav(item.key) ? 'active' : '']"
                  role="button"
                  tabindex="0"
                >
                  {{ item.label }}
                </span>
              </a-popover>
            </template>
            <template v-else>
              <NuxtLink
                :to="item.path"
                :class="['nav-link', isActiveNav(item.key) ? 'active' : '']"
                :aria-current="isActiveNav(item.key) ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
            </template>
          </li>
        </ul>
      </nav>

      <!-- 联系我们 -->
      <div class="search">
        <div class="search-pc">
          <NuxtLink to="/#contact_us" class="search-pc-item">
            <svg class="sense-icon" aria-hidden="true">
              <use xlink:href="#sense-email"></use>
            </svg>
            <span class="search-pc-item-text">{{ $t('index.common.contact') }}</span>
          </NuxtLink>
        </div>
        <!-- 移动端汉堡菜单 -->
        <button
          class="mobile-menu-btn"
          :aria-expanded="showMobileNav"
          aria-label="Toggle navigation menu"
          @click="showMobileNav = !showMobileNav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- 移动端抽屉菜单 -->
  <a-drawer
    root-class-name="menu-drawer"
    placement="left"
    :closable="false"
    v-model:open="showMobileNav"
    width="75%"
    :z-index="1001"
  >
    <nav aria-label="Mobile navigation">
      <ul class="mobile-nav-list">
        <li v-for="item in navItems" :key="item.key">
          <template v-if="item.children">
            <div class="mobile-nav-group">
              <span class="mobile-nav-group-title">{{ item.label }}</span>
              <template v-for="group in item.children" :key="group.key">
                <NuxtLink
                  v-for="sub in group.children"
                  :key="sub.key"
                  :to="sub.path"
                  class="mobile-nav-item"
                  @click="showMobileNav = false"
                >
                  {{ sub.label }}
                </NuxtLink>
              </template>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              :to="item.path"
              class="mobile-nav-item"
              @click="showMobileNav = false"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </li>
      </ul>
    </nav>
  </a-drawer>
</template>

<script lang="ts" setup>
import { useProductStore } from '~/stores/products'

const { t } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const cdnUrl = config.public.cdnUrl
const productStore = useProductStore()

const showMobileNav = ref(false)
const isScrollTop = ref(true)

// 构建导航菜单
const navItems = computed(() => [
  {
    key: 'home',
    label: t('index.routes.home'),
    path: '/',
  },
  {
    key: 'why_electric',
    label: t('index.routes.why'),
    path: '/why_electric',
  },
  {
    key: 'products',
    label: t('index.routes.products'),
    children: productStore.menuItems,
  },
  {
    key: 'aboutus',
    label: t('index.routes.about'),
    path: '/aboutus',
  },
])

function isActiveNav(key: string): boolean {
  const path = route.path
  if (key === 'home') return path === '/'
  if (key === 'why_electric') return path.startsWith('/why_electric') || path.startsWith('/news')
  if (key === 'products') return path.startsWith('/product')
  if (key === 'aboutus') return path.startsWith('/aboutus')
  return false
}

// 滚动监听
if (process.client) {
  onMounted(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      isScrollTop.value = scrollTop === 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
  })
}

const isBlackHeader = computed(() => {
  const path = route.path
  return (
    path.startsWith('/why_electric') ||
    path.startsWith('/aboutus') ||
    path.startsWith('/brand')
  )
})
</script>

<style lang="less" scoped>
.all_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background 0.3s;

  &.sticky {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
  }

  &.newsPage {
    background: rgba(0, 0, 0, 0.7);
  }
}

.header-container {
  display: flex;
  align-items: center;
  height: 65px;
  padding: 0 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.logo {
  flex-shrink: 0;
  img { height: 40px; width: auto; }
}

.navigation {
  flex: 1;
  margin-left: 40px;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  height: 65px;
  padding: 0 1.6vw;
  color: rgba(255, 255, 255, 0.85);
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition: color 0.3s;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 80%;
    height: 2px;
    background: #f2d0b0;
    transform: scaleX(0) translateX(-50%);
    transform-origin: left;
    transition: transform 0.5s;
  }

  &:hover,
  &.active {
    color: #fff;
    &::before { transform: scaleX(1) translateX(-50%); }
  }
}

.search {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.search-pc-item {
  display: flex;
  align-items: center;
  color: #fff;
  gap: 6px;
  text-decoration: none;
  font-size: 14px;
  &:hover { color: #f2d0b0; }
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  span {
    display: block;
    width: 22px;
    height: 2px;
    background: #fff;
    transition: all 0.3s;
  }
}

.nav-dropdown-content {
  min-width: 180px;
  padding: 8px 0;
  background: rgba(0, 0, 0, 0.85);
}

.nav-group-title {
  padding: 6px 16px;
  color: rgba(255,255,255,0.45);
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.nav-dropdown-item {
  display: block;
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  &:hover {
    color: #fff;
    background: rgba(255,255,255,0.1);
  }
}

.mobile-nav-list {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}

.mobile-nav-item {
  display: block;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  &:hover { color: #fff; background: rgba(255,255,255,0.05); }
}

.mobile-nav-group-title {
  display: block;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
  text-transform: uppercase;
}

@media screen and (max-width: 1080px) {
  .navigation { display: none; }
  .search-pc { display: none; }
  .mobile-menu-btn { display: flex; }
}
</style>

<!-- components/AppFooter.vue -->
<template>
  <footer class="footer-wrapper" role="contentinfo">
    <div class="footer-inner">
      <div class="footer-box">
        <!-- About -->
        <div class="section">
          <NuxtLink to="/aboutus" class="footer-link-title">About&nbsp;&nbsp;SENSE</NuxtLink>
          <NuxtLink to="/why_electric" class="footer-link-title mt-6">About&nbsp;&nbsp;Electric</NuxtLink>

          <div class="footer-link-title mt-6" style="cursor: default;">Products</div>
          <div class="mt-2 ml-2">
            <template v-for="group in productStore.menuItems" :key="group.key">
              <a-popover placement="right" color="#000">
                <template #content>
                  <div
                    v-for="sub in group.children"
                    :key="sub.key"
                    class="footer-product-link"
                    @click="navigateTo(sub.path)"
                  >
                    {{ sub.label }}
                  </div>
                </template>
                <div class="footer-sub-link">{{ group.label }}</div>
              </a-popover>
            </template>
          </div>
        </div>

        <!-- Contact -->
        <div class="section contact-section">
          <div class="footer-section-title">Contact&nbsp;&nbsp;us</div>
          <address class="footer-address">
            <div class="contact-item">
              <svg class="sense-icon" aria-hidden="true">
                <use xlink:href="#sense-email"></use>
              </svg>
              <a href="mailto:info@sensemotor.com">{{ $t('index.common.email') }}: info@sensemotor.com</a>
            </div>
            <div class="contact-item">
              <svg class="sense-icon" aria-hidden="true">
                <use xlink:href="#sense-whatsapp"></use>
              </svg>
              <a href="https://wa.me/40762075103">{{ $t('index.common.whatsapp') }}: +40 762075103</a>
            </div>
            <div class="footer-addresses">
              <div class="address-row">
                <svg class="sense-icon" aria-hidden="true">
                  <use xlink:href="#sense-Romania"></use>
                </svg>
                <span>Romania：Bloc 452, Aleea Dealul Măcinului 1a, București</span>
              </div>
              <div class="address-row">
                <svg class="sense-icon" aria-hidden="true">
                  <use xlink:href="#sense-Hungary"></use>
                </svg>
                <span>Hungary：1107 Budapest, Száva utca 4B</span>
              </div>
              <div class="address-row">
                <svg class="sense-icon" aria-hidden="true">
                  <use xlink:href="#sense-Greece"></use>
                </svg>
                <span>Greece：113 ORFEOS STREET Athens</span>
              </div>
            </div>
          </address>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} SenseMotor. All rights reserved.</p>
        <div class="footer-bottom-links">
          <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms">Terms of Use</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { useProductStore } from '~/stores/products'
const productStore = useProductStore()
</script>

<style lang="less" scoped>
.footer-wrapper {
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}
.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px 30px;
}
.footer-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}
.section { min-width: 200px; }
.footer-link-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
  &:hover { color: #fff; }
  &.mt-6 { margin-top: 24px; }
}
.footer-section-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
}
.footer-sub-link {
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.3s;
  &:hover { color: #fff; }
}
.footer-product-link {
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s;
  &:hover { color: #fff; }
}
.footer-address { font-style: normal; }
.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    &:hover { color: #fff; }
  }
}
.footer-addresses { margin-top: 16px; }
.address-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
  line-height: 1.5;
}
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  p { margin: 0; color: rgba(255,255,255,0.5); }
}
.footer-bottom-links {
  display: flex;
  gap: 20px;
  a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-size: 13px;
    &:hover { color: #fff; }
  }
}
.ml-2 { margin-left: 8px; }
.mt-2 { margin-top: 8px; }

@media (max-width: 768px) {
  .footer-inner { padding: 40px 20px 20px; }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

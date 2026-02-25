<!-- pages/aboutus.vue -->
<template>
  <div class="childpage_wrapper news_detail_wrapper news_wrapper aboutus-page">
    <div class="aboutus-content">
      <!-- About Section -->
      <section class="about-section" aria-labelledby="about-heading">
        <div class="about-container">
          <div class="flex top-container">
            <div class="container-l">
              <NuxtImg
                class="logo-img"
                :src="`${cdnUrl}/resource/images/aboutsense.webp`"
                alt="SenseMotor - About Us"
                width="500"
                height="400"
                loading="lazy"
              />
            </div>
            <div class="container-r">
              <h1 class="aboutus_title">
                <span>about&nbsp;</span>
                <NuxtImg
                  class="text-logo"
                  :src="`${cdnUrl}/resource/images/SENSE2.webp`"
                  alt="SENSE"
                  width="120"
                  height="36"
                  loading="eager"
                />
                <span>MOTOR</span>
              </h1>
              <p class="aboutus_sub-title">Pioneer in Electric Commercial Vehicle Solutions</p>
              <div class="about-text mt-3">
                <p class="content-p">
                  As the Exclusive Regional Official Representative for Dongfeng and Wuling New Energy Vehicles,
                  SenseMotor delivers cutting-edge electric commercial vehicles and innovative logistics
                  solutions throughout Central and Eastern Europe.
                </p>
                <p class="content-p">
                  Our comprehensive ecosystem integrates extensive distribution networks, dedicated technical
                  support, seamless project delivery, and a reliable service station network for electric
                  light trucks and vans.
                </p>
                <p class="content-p">
                  Operating in Poland, Hungary, Greece, and Romania, we empower sustainable logistics and
                  optimize fleet efficiency, driving the future of clean transportation in the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section
        class="why_choose_content"
        :style="`background-image: url('${cdnUrl}/resource/images/center_bg.webp')`"
        aria-labelledby="why-choose-heading"
      >
        <h2 id="why-choose-heading" class="aboutus_title">
          <span>Why choose&nbsp;</span>
          <NuxtImg
            class="text-logo"
            :src="`${cdnUrl}/resource/images/logo_header.webp`"
            alt="SenseMotor"
            width="120"
            height="36"
            loading="lazy"
          />
          <span>&nbsp;MOTOR？</span>
        </h2>
        <div class="choose-grid">
          <div v-for="item in whyChooseItems" :key="item.title" class="choose-item">
            <div class="choose-icon">{{ item.icon }}</div>
            <h3 class="choose-title">{{ item.title }}</h3>
            <p class="choose-desc">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Coverage Map -->
      <section class="coverage-section" aria-labelledby="coverage-heading">
        <div class="about-container">
          <h2 id="coverage-heading" class="section-title">Our Coverage Area</h2>
          <p class="section-desc">Central & Eastern Europe network</p>
          <div class="coverage-countries">
            <div v-for="country in countries" :key="country.name" class="country-card">
              <div class="country-flag" :aria-label="`${country.name} flag`">{{ country.flag }}</div>
              <h3 class="country-name">{{ country.name }}</h3>
              <p class="country-city">{{ country.city }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const cdnUrl = config.public.cdnUrl

const whyChooseItems = [
  { icon: '🏆', title: 'Official Representative', desc: 'Exclusive authorized dealer for Dongfeng and Wuling EV brands in the region.' },
  { icon: '⚡', title: 'Full EV Ecosystem', desc: 'Complete solution from vehicle supply to charging infrastructure and after-sales service.' },
  { icon: '🔧', title: 'Technical Excellence', desc: 'Dedicated technical support teams with factory-trained engineers across all markets.' },
  { icon: '🌿', title: 'Sustainable Future', desc: 'Committed to driving the green logistics revolution across Central and Eastern Europe.' },
]

const countries = [
  { name: 'Romania', city: 'București', flag: '🇷🇴' },
  { name: 'Hungary', city: 'Budapest', flag: '🇭🇺' },
  { name: 'Greece', city: 'Athens', flag: '🇬🇷' },
  { name: 'Poland', city: 'Warsaw', flag: '🇵🇱' },
]

// ✅ SEO
useSeo({
  title: 'About SenseMotor - Pioneer in Electric Commercial Vehicle Solutions',
  description: 'SenseMotor is the exclusive regional official representative for Dongfeng and Wuling New Energy Vehicles in Central and Eastern Europe, operating in Romania, Hungary, Greece, and Poland.',
  keywords: 'SenseMotor about us, electric commercial vehicle Europe, Dongfeng representative, Wuling EV dealer, Eastern Europe electric van',
  image: `${cdnUrl}/resource/images/aboutsense.webp`,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SenseMotor',
    description: 'Exclusive Regional Official Representative for Dongfeng and Wuling New Energy Vehicles in Central and Eastern Europe.',
    mainEntity: {
      '@type': 'Organization',
      name: 'SenseMotor',
      foundingDate: '2020',
      areaServed: ['Romania', 'Hungary', 'Greece', 'Poland'],
      knowsAbout: ['Electric Vehicles', 'Commercial Vans', 'Electric Trucks', 'Logistics Solutions'],
    },
  },
})
</script>

<style lang="less" scoped>
.aboutus-page { padding-top: 65px; }
.about-section { padding: 60px 0; }
.about-container { max-width: 1300px; margin: 0 auto; padding: 0 40px; }
.top-container {
  display: flex;
  gap: 60px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.container-l {
  flex-shrink: 0;
  width: 45%;
  min-width: 280px;
}
.logo-img { width: 100%; border-radius: 12px; }
.container-r { flex: 1; min-width: 280px; }
.aboutus_title {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 700;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: #0232da;
  margin-bottom: 8px;
}
.text-logo { height: 36px; width: auto; }
.aboutus_sub-title {
  font-size: 18px;
  color: #555;
  margin-bottom: 24px;
}
.content-p {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin-bottom: 16px;
}
.mt-3 { margin-top: 12px; }

.why_choose_content {
  padding: 80px 40px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: #fff;
}
.choose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 40px auto 0;
}
.choose-item {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
}
.choose-icon { font-size: 36px; margin-bottom: 12px; }
.choose-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.choose-desc { font-size: 14px; opacity: 0.85; line-height: 1.6; }

.coverage-section {
  padding: 80px 0;
  background: #f9f9f9;
}
.section-title { font-size: clamp(22px, 3vw, 32px); font-weight: 700; text-align: center; margin-bottom: 8px; }
.section-desc { text-align: center; color: #666; margin-bottom: 40px; }
.coverage-countries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}
.country-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px 32px;
  text-align: center;
  min-width: 160px;
}
.country-flag { font-size: 40px; margin-bottom: 8px; }
.country-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.country-city { font-size: 13px; color: #888; margin: 0; }

@media (max-width: 768px) {
  .container-l { width: 100%; }
  .why_choose_content { padding: 60px 20px; }
}
</style>

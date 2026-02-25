<!-- components/ContactForm.vue -->
<template>
  <div class="contact-form-wrapper">
    <div v-if="submitted" class="success-message" role="alert" aria-live="polite">
      <div class="success-icon">✓</div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for your interest. Our team will contact you within 24 hours.</p>
    </div>

    <form
      v-else
      class="contact-form"
      @submit.prevent="handleSubmit"
      novalidate
      aria-label="Contact form"
    >
      <div class="form-row">
        <div class="form-group">
          <label for="contact-name" class="form-label">
            Name <span aria-label="required">*</span>
          </label>
          <a-input
            id="contact-name"
            v-model:value="form.name"
            placeholder="Your full name"
            :status="errors.name ? 'error' : ''"
            autocomplete="name"
          />
          <span v-if="errors.name" class="error-msg" role="alert">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="contact-email" class="form-label">
            Email <span aria-label="required">*</span>
          </label>
          <a-input
            id="contact-email"
            v-model:value="form.email"
            type="email"
            placeholder="your@email.com"
            :status="errors.email ? 'error' : ''"
            autocomplete="email"
          />
          <span v-if="errors.email" class="error-msg" role="alert">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="contact-company" class="form-label">Company</label>
          <a-input
            id="contact-company"
            v-model:value="form.company"
            placeholder="Company name"
            autocomplete="organization"
          />
        </div>
        <div class="form-group">
          <label for="contact-phone" class="form-label">Phone</label>
          <a-input
            id="contact-phone"
            v-model:value="form.phone"
            placeholder="+1 234 567 890"
            autocomplete="tel"
          />
        </div>
      </div>

      <div class="form-group" v-if="productName">
        <label for="contact-product" class="form-label">Product of Interest</label>
        <a-input
          id="contact-product"
          v-model:value="form.product"
          :placeholder="productName"
          readonly
        />
      </div>

      <div class="form-group">
        <label for="contact-message" class="form-label">
          Message <span aria-label="required">*</span>
        </label>
        <a-textarea
          id="contact-message"
          v-model:value="form.message"
          :rows="5"
          placeholder="Tell us about your fleet needs..."
          :status="errors.message ? 'error' : ''"
        />
        <span v-if="errors.message" class="error-msg" role="alert">{{ errors.message }}</span>
      </div>

      <div class="form-actions">
        <a-button
          type="primary"
          html-type="submit"
          :loading="submitting"
          size="large"
          class="submit-btn"
        >
          {{ submitting ? 'Sending...' : 'Send Message' }}
        </a-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  productName?: string
}
const props = withDefaults(defineProps<Props>(), {
  productName: '',
})

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  product: props.productName || '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)

function validate(): boolean {
  errors.name = ''
  errors.email = ''
  errors.message = ''

  let valid = true
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    valid = false
  }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Valid email is required'
    valid = false
  }
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
    valid = false
  }
  return valid
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  try {
    // 调用 API 发送表单
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    submitted.value = true
  } catch (error) {
    // 降级处理：发送到邮件链接
    const mailBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nProduct: ${form.product}\n\nMessage:\n${form.message}`,
    )
    window.open(`mailto:info@sensemotor.com?subject=Inquiry from ${form.name}&body=${mailBody}`)
    submitted.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="less" scoped>
.contact-form-wrapper {
  max-width: 800px;
  margin: 0 auto;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}
.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  span { color: #ff4d4f; margin-left: 2px; }
}
.error-msg {
  color: #ff4d4f;
  font-size: 12px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.submit-btn {
  min-width: 160px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px !important;
}
.success-message {
  text-align: center;
  padding: 60px 20px;
}
.success-icon {
  width: 64px;
  height: 64px;
  background: #52c41a;
  color: #fff;
  border-radius: 50%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
</style>

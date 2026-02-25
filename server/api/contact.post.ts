// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 验证
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  // 在此处接入邮件发送服务，例如 Nodemailer / Resend / SendGrid
  // 示例（伪代码）：
  // await sendEmail({
  //   to: 'info@sensemotor.com',
  //   subject: `New inquiry from ${body.name}`,
  //   html: `<p>Name: ${body.name}</p><p>Email: ${body.email}</p><p>Message: ${body.message}</p>`,
  // })

  console.log('[Contact Form]', {
    name: body.name,
    email: body.email,
    company: body.company,
    product: body.product,
    message: body.message.substring(0, 100),
  })

  return {
    success: true,
    message: 'Your inquiry has been received. We will contact you within 24 hours.',
  }
})

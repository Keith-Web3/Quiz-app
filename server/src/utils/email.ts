import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
})

export async function sendMail(to: string, subject: string, text: string) {
  // send mail with defined transport object
  const info = await transport.sendMail({
    from: 'olorunnisholaolamilekan@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  })

  console.log(info)
}

await sendMail(
  'temiloluwaopemipo63@gmail.com',
  'How to train your dragon',
  'Hello wicked world'
)

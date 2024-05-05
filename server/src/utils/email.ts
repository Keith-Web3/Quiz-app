import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 25,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
})

export async function sendMail(to: string, subject: string, text: string) {
  // send mail with defined transport object
  const info = await transport.sendMail({
    from: "Olorunnishola's practise app <Ola.io>", // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  })

}
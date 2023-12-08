"use server"
import sgMail, { MailDataRequired } from '@sendgrid/mail'

const API_KEY = process.env.SENDGRID_API_KEY!
sgMail.setApiKey(API_KEY)

export const sendMagicLinkEmail = async (
   email: string,
   resetedPassword: string
) => {
   const html = `
   <div>
      <h2>Forgot your password?</h2><br><br>
      <p>No problem. Here's your new temporary password:</p><br><br>
      <b>${resetedPassword}</b><br><br>
      <p>Don't forget to change it after logging in into your account.</p><br><br>
      <p>Here's a link back to the login page.</p><br><br>
      <a href="http://127.0.0.1:5173/login">http://127.0.0.1:3000/login</a>
   </div>
`
   const msg = {
      to: email, // Change to your recipient
      from: process.env.EMAIL_FROM, // Change to your verified sender
      subject: 'Password Reset for Panda\'s recipes',
      html: html,
   } as MailDataRequired
   return sgMail.send(msg)
}

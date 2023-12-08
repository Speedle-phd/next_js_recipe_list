'use server'

import { cookies } from 'next/headers'
import prisma from './db'
import * as jose from 'jose'
import { redirect } from 'next/navigation'

export const guestLoginAction = async () => {
   const cookieStore = cookies()
   const guest = await prisma.user.findUnique({
      where: {
         email: 'guest@panda-recipes.com',
      },
   })
   const token = await new jose.SignJWT()
      .setIssuer(guest.email)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))
   cookieStore.set('panda-recipes-auth', token)
   redirect('/dashboard')
}


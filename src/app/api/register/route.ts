import { registerSchema } from '@/lib/types'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { getErrorMessage } from '@/lib/utils'
import prisma from '@/lib/db'
import { cookies } from 'next/headers'
import * as jose from 'jose'

export async function POST(request: Request) {
   const body: { email: string; password: string; confirmPassword: string } =
      await request.json()
   const validate = registerSchema.safeParse(body)
   let zodErrors = {}
   let token
   try {
      if (!validate.success) {
         validate.error.issues.forEach((el) => {
            zodErrors = { ...zodErrors, [el.path[0]]: el.message }
         })
      } else {
         bcrypt.hash(body.password, 10, async(err, hash) => {
            console.log(err, hash)
            if (err) throw new Error(getErrorMessage(err))
            await prisma.user.create({
               data: {
                  email: body.email,
                  password: hash,
               },
            })
         })
         token = await new jose.SignJWT()
            .setIssuer(body.email)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('2d')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET))
         const cookieStore = cookies()
         cookieStore.set('panda-recipes-auth', token)
      }
   } catch (error) {
      const message = getErrorMessage(error)
      return NextResponse.json({
         success: false,
         statuscode: 400,
         message,
      })
   }

      return NextResponse.json(
         Object.keys(zodErrors).length > 0
            ? { success: false, errors: zodErrors }
            : { success: true }
      )
}
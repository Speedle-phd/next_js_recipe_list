
import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

import { cookies } from 'next/headers'
import * as jose from 'jose'
import prisma from '../../../lib/db'
import { registerSchema } from '../../../lib/types'
import { getErrorMessage } from '../../../lib/utils'
import { BadRequestError } from '../../../lib/errors'

export async function POST(request: Request) {
   const body: { email: string; password: string; confirmPassword: string } =
      await request.json()
   const validate = registerSchema.safeParse(body)
   let zodErrors = {}
   let token;
   let user;
   try {
      if (!validate.success) {
         //@ts-ignore
         validate.error.issues.forEach((el) => {
            zodErrors = { ...zodErrors, [el.path[0]]: el.message }
         })
      } else {
         bcrypt.hash(body.password, 10, async(err, hash) => {
            console.log(err, hash)
            if (err) throw new BadRequestError(getErrorMessage(err))
            user = await prisma.user.create({
               data: {
                  email: body.email,
                  password: hash,
               },
            })
         })
         token = await new jose.SignJWT({
            email: user.email,
            username: user.username,
            id: user.id,
         })
            .setIssuer(body.email)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('2d')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET))
         const cookieStore = cookies()
         cookieStore.set('panda-recipes-auth', token)
      }
   } catch (error) {
      const message = getErrorMessage(error)
      const statuscode = error.statuscode ?? undefined
      return NextResponse.json({
         success: false,
         statuscode,
         message,
      })
   }

      return NextResponse.json(
         Object.keys(zodErrors).length > 0
            ? { success: false, errors: zodErrors }
            : { success: true }
      )
}

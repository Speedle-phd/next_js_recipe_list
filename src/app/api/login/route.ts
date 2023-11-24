import prisma from "@/lib/db";
import { loginSchema } from "@/lib/types";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from 'jose'
import { getErrorMessage } from "@/lib/utils";
import * as bcrypt from 'bcrypt'
export async function POST(request: Request) {
   const body: {[key: string]: string} = await request.json();
   const result = loginSchema.safeParse(body);
   let token;
   let zodErrors = {}
   if (!result.success){
      //@ts-ignore
      result.error.issues.forEach(el => {
         zodErrors = {...zodErrors, [el.path[0]]: el.message}
      })
   } else {
      try {
         const user = await prisma.user.findUnique({ 
            where: { email: body.email}
         })
         if (!user) throw new Error('User not found')
         if (await bcrypt.compare(body.password, user.password)){
            //@ts-ignore
            token = await new jose.SignJWT()
               .setIssuer(user.email)
               .setProtectedHeader({ alg: 'HS256' })
               .setExpirationTime('2d')
               .sign(new TextEncoder().encode(process.env.JWT_SECRET))
            const cookieStore = cookies()
            cookieStore.set("panda-recipes-auth", token)
         } else {
            throw new Error('Invalid password')
         }
      } catch (error) {
         const message = getErrorMessage(error)
         return NextResponse.json({ success: false, statuscode: 401, message })
      }
   }
   return NextResponse.json(
      Object.keys(zodErrors).length > 0 ? 
      { success: false, errors: zodErrors } : 
      { success: true }
   )
}
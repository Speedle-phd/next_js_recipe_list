'use server'

import { cookies, headers } from 'next/headers'
import prisma from './db'
import * as jose from 'jose'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { verifyJwt } from './jwt'
import { UnauthorizedError } from './errors'
import { getErrorMessage } from './utils'
import { changePasswordSchema } from './types'
import bcrypt from 'bcrypt'

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

export const updateRank = async(id: string, rank: number) => {
   const cookieStore = cookies()
   const authCookie = cookieStore.get('panda-recipes-auth')
   const verified = await verifyJwt(authCookie.value)

   if (!verified) return new UnauthorizedError('You are not authorized to perform this action.')


   const {payload: {id: userId}} = verified
   
   try {
      const updateRank = await prisma.recipe.update({
         where: {
            authorId: userId,
            id,
         },
         data: {
            rank
         }
      })
      if(updateRank){
         revalidateTag('recipes')
         return {success: true}
      }

   } catch (err) {
      return new Error(getErrorMessage(err))
   }
}

export const patchPassword = async(userId: string, {message}, formData: FormData) => {

   let errorArr = []
   const password = formData.get('password') as string
   const confirmPassword = formData.get('confirm-password')
   const payload = {
      password,
      confirmPassword
   }
   const result = changePasswordSchema.safeParse(payload) as {success: boolean; error: {errors: {message: string}[]}}
   if(!result.success){
      result.error.errors.forEach(err => {
         errorArr.push(err.message)
      })
      return {message: errorArr}
   }
   const hash = await bcrypt.hash(password, 10)
   try {
      const patchedPassword = await prisma.user.update({
         where: {
            id: userId
         },
         data: {
            password: hash
         }
      })
      if(patchedPassword){
         return {success: true}
      }
   } catch (error) {
      return {success: false, message: [getErrorMessage(error)]}
   }


}
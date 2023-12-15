// @ts-nocheck

import prisma from '@/lib/db'
import { addRecipeServerSchema } from '@/lib/types'
import { writeFile } from 'fs/promises'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
   const body = await request.formData()
   const id = request.headers.get('x-userid')

   const img = (body.get('file') as File) ?? null
   let imageName
   if (img) {
      imageName = `${Date.now()}-${id}-${img.name}`.trim()
      const arrBuffer = await img.arrayBuffer()
      const buffer = Buffer.from(arrBuffer)
      await writeFile(
         path.join(process.cwd(),`/public/uploads/${imageName}`),
         buffer
      )
   }
   console.log(
      process.cwd()
   )

   const title = (body.get('title') as string) ?? null
   const sources = (body.get('sources') as string) ?? null

   const type = (body.get('type') as string) ?? null
   const ingredients = (body.getAll('ingredients') as string[]) ?? null
   const tags = [...ingredients, type].join(', ')

   //CREATE ZOD TYPE AND VALIDATE
   const data = {
      title,
      image: imageName,
      authorId: id,
      tags,
      sources,
   }
   const zodResult = addRecipeServerSchema.safeParse(data)
   let zodErrors = {}
   if (!zodResult.success) {
      zodResult.error.issues.forEach((issue) => {
         zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
      })
   }

   if (Object.keys(zodErrors).length > 0) {
      return NextResponse.json({ success: false, errors: zodErrors })
   }

   const newRecipe = await prisma.recipe.create({
      data,
   })
   if (newRecipe) {

      revalidateTag('recipes')
      
      return NextResponse.json({ success: true })
   }
   return NextResponse.json({
      success: false,
      statuscode: 400,
      message: 'Bad Request. Something went wrong. Please try again.',
   })
}

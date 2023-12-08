import prisma from "@/lib/db"
import fileUpload from 'express-fileupload'
import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { createEdgeRouter } from 'next-connect'
import multer from "multer"
import fs from 'fs'

// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, 'public/uploads/')
//    },
//    filename: (req, file, cb) => {
//       const { user_id: id } = req.query
//       const uniqueSuffix = Date.now()
//       console.log(req, file, "!!!!!!!!!")
//       cb(null, file.fieldname + '-' + id + '.jpg')
//    },
// })
// const upload = multer({ storage: storage })

interface RequestContext {
   params: {
      id: string
   }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.post(async(request) => {
   const body = await request.formData()
   const id = request.headers.get('x-userid')

   const img = body.get("file") as File ?? null 
   let imageName;
   if (img) {
      imageName = `${Date.now()}@${id}@${img.name}`
      const arrBuffer = await img.arrayBuffer()
      const buffer = Buffer.from(arrBuffer)
      await writeFile(path.join(__dirname, `../../../../../public/uploads/${imageName}`), buffer)
   }

   const title = body.get('title')as string ?? null 
   const sources = body.get('sources') as string ?? null

   const type = body.get('type')as string ?? null 
   const ingredients = body.getAll('ingredients') as string[] ?? null
   const tags = [...ingredients, type].join(", ")


   //CREATE ZOD TYPE AND VALIDATE


   const newRecipe = await prisma.recipe.create({
      data: {
         title,
         image: imageName,
         authorId: id,
         tags,
         sources
      }
   })
   if(newRecipe){
      return NextResponse.json({ success: true })
   } else {
      return NextResponse.json({ success: false, statuscode: 400, message: 'Bad Request. Something went wrong. Please try again.' })
   }
})

export async function POST(request: NextRequest, ctx: RequestContext){
   return router.run(request, ctx)
}

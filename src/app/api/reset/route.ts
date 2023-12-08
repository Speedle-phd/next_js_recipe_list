import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { NotFoundError } from "@/lib/errors";
import { sendMagicLinkEmail } from "@/lib/email";
import { getErrorMessage } from "@/lib/utils";
import { resetSchema } from "@/lib/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: Request){
   const body = await request.json()
   
   const validate = resetSchema.safeParse(body)
   if (!validate.success) {
      return NextResponse.json({success: false, message: "Bad Request - Invalid Input", statuscode: 400})
   }

   const {email} = body

   const newPassword = crypto.randomUUID()
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(newPassword, salt)
   try {
      const user = await prisma.user.update({
         where: {
            email: email
         },
         data: {
            password: hashedPassword
         }
      })
      if (!user) {
         const error = new NotFoundError('User not found.')
         const statuscode = error.statuscode ?? undefined
         const message = getErrorMessage(error)
         return NextResponse.json({success: false, statuscode, message})
      }
   
      await sendMagicLinkEmail(email, newPassword)
      return NextResponse.json({
         success: true,
      })
   } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
         console.log(error)
         return NextResponse.json({success: false, statuscode: 404, message: error.meta.cause})
      }
   }
}


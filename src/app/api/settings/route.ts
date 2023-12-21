import prisma from "@/lib/db"
import { getErrorMessage } from "@/lib/utils"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
   const body = await request.json()
   const header = headers()
   const userId = header.get('x-userid')
   try {
      const deletedUser = await prisma.user.delete({
         where: {
            id: userId,
            email: body
         }
      })
      // const deletedUser = true
      if(deletedUser){
         return NextResponse.json({success: true, message:""})
      }
   } catch (err) {
      return NextResponse.json({success: false, message: getErrorMessage(err)})
   }

}
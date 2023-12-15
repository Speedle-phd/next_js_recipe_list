import { NextResponse, NextRequest } from "next/server"
import { headers, cookies } from 'next/headers'
import prisma from '@/lib/db'
export async function GET(request: NextRequest){


   console.log(
      'getAll'
   )


   const  page  = request.nextUrl.searchParams.get('page') || 1
   const skip = page ? +page - 1 : 0
   const hasLess = skip === 0 ? false : true
   const userId = headers().get('x-userid')

      const length = await prisma.recipe
         .findMany({ where: { authorId: userId } })
         .then((data) => data.length)

      const maxPages = Math.ceil(length / 10)
      const hasMore = +page !== maxPages

      console.log(hasMore)
      const recipesArr = await prisma.recipe.findMany({
         where: {
            authorId: userId,
         },
         skip: skip * 10,
         take: 10,
         orderBy: {
            title: 'asc',
         },
      })


   return NextResponse.json({recipesArr, hasMore, hasLess, maxPages})
}
import { NextResponse, NextRequest } from "next/server"
import { headers, cookies } from 'next/headers'
import prisma from '@/lib/db'
export async function GET(request: NextRequest){
   const SKIP = 10

   const title = request.nextUrl.searchParams.get('title') || ""
   const sources = request.nextUrl.searchParams.get('sources') || ""
   const ingredients = request.nextUrl.searchParams.get('ingredients') || ""
   const rank = +request.nextUrl.searchParams.get('rank') || 0
   const type =
      request.nextUrl.searchParams.get('type') === 'null'
         ? ''
         : request.nextUrl.searchParams.get('type') || ""
   console.log(title,sources,ingredients,rank,type)

   const page  = request.nextUrl.searchParams.get('page') || 1
   const skip = page ? +page - 1 : 0
   const hasLess = skip === 0 ? false : true
   const userId = headers().get('x-userid')

      const length = await prisma.recipe
         .findMany({
            where: {
               authorId: userId,
               rank: {
                  gte: rank,
               },
               title: {
                  contains: title,
               },
               sources: {
                  contains: sources,
               },
               AND: [
                  {
                     tags: {
                        contains: type,
                     },
                  },
                  {
                     tags: {
                        contains: ingredients,
                     },
                  },
               ],
            },
         })
         .then((data) => data.length)

      const maxPages = Math.max(1, Math.ceil(length / SKIP))
      const hasMore = +page !== maxPages

      console.log(length, maxPages, hasMore)
      const recipesArr = await prisma.recipe.findMany({
         where: {
            authorId: userId,
            rank: {
               gte: rank
            },
            title: {
               contains: title
            },
            sources: {
               contains: sources
            },
            AND: [
               {
                  tags: {
                     contains: type
                  }
               },
               {
                  tags: {
                     contains: ingredients
                  }
               },
            ]

         },
         skip: skip * SKIP,
         take: SKIP,
         orderBy: {
            title: 'asc',
         },
      })


   return NextResponse.json({recipesArr, hasMore, hasLess, maxPages})
}
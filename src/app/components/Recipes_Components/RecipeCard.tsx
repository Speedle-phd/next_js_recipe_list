import React from 'react'
// import Image from 'next/image'
// import plate from '@/../public/images/plate.jpg'
import RatingSystemClient from './RatingSystemClient'
import { headers } from 'next/headers'
// import { verifyJwt } from '@/lib/jwt'
import prisma from '@/lib/db'
import { revalidateTag } from 'next/cache'
import ClientImage from './ClientImage'

import AddMenuButtonProvider from './AddMenuButtonProvider'
// import { getErrorMessage } from '@/lib/utils'

type PRecipeCard = {
   id: string
   title: string
   sources?: string
   imagePath?: string
   width: number
   rank: number
   tagsArr?: string[]
}

const RecipeCard = async ({
   id,
   title,
   sources,
   imagePath,
   width,
   rank,
   tagsArr,
}: PRecipeCard) => {
   const header = headers()
   const userId = header.get('x-userid')
   const { PAGE_URL } = process.env
   // const imageUrl = imagePath

   const addMenuButtonProps = {
      id, title, sources, imagePath, tagsArr, PAGE_URL
   }

   //refactor to route /api/recipes/delete
   const deleteAction = async () => {
      'use server'
      console.log(id, userId)
      try {
         const deletedEntry = await prisma.recipe.delete({
            where: {
               authorId: userId,
               id,
            },
         })
         if (deletedEntry) {
            revalidateTag('recipes')
         }
      } catch (err) {
         console.log(err)
         throw err
      }
   }

   return (
      <div
         key={id}
         className='bg-white shadow-xl join flex flex-col gap-1 max-w-fit text-center mx-auto py-4'
      >
         <h2 className='font-bold text-2xl join-item'>{title}</h2>
         <div className='custom-underline'></div>
         <ClientImage
            pageUrl={PAGE_URL}
            className='object-cover aspect-square join-item'
            src={imagePath}
            alt={title}
            width={width}
            height={width}
         />
         <p className='text-stone-400 text-[0.8rem] italic join-item'>
            {sources !== '' ? sources : 'Source n/a'}
         </p>
         {/* <div className='flex gap-2'> 
             {tagsArr
               .sort((a, b) => a.localeCompare(b))
               .map((tag, index) => {
                  return (
                     <div
                        key={index}
                        className='rounded-none badge badge-primary capitalize'
                     >
                        {tag}
                     </div>
                  )
               })} 
          </div> */}
         <RatingSystemClient id={id} rank={rank} />
         <div className='custom-underline !mt-4'></div>
         <div className='flex mx-auto gap-2 '>
            <AddMenuButtonProvider addMenuButtonProps={addMenuButtonProps}/>
            {/* MAKE IT A CLIENT COMPONENT WITH MENUCONTEXT IN ORDER TO DELETE ITEM FROM LOCAL STORAGE */}
            <form action={deleteAction}>
               <button
                  type='submit'
                  className=' text-[clamp(0.6rem,0.5vw_+_0.4rem,0.9rem)] btn btn-sm btn-error btn-outline'
               >
                  Delete dish
               </button>
            </form>
         </div>
      </div>
   )
}

export default RecipeCard

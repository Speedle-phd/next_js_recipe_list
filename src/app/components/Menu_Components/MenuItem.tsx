"use client"
import ClientImage from '../Recipes_Components/ClientImage'
import React, { Suspense } from 'react'
import { TMenuItem } from '@/lib/types'
import { useMenuContext } from '@/lib/context/MenuContextProvider'
type PMenuItem = TMenuItem

const MenuItem = ({ id, PAGE_URL, imagePath, title, sources, tagsArr } : PMenuItem) => {
   const {deleteMenuItem} = useMenuContext()
   console.log(tagsArr)
   const type = tagsArr.find(el => {
      const types = ["meat", "vegetarian", "vegan"]
      if (types.includes(el)) return el
   })
   return (
      <div className='mx-auto w-[256px] md:w-[512px] card md:card-side bg-base-100 shadow-xl '>
         <figure>
            <Suspense fallback={<div className="loading loading-ring"></div>}>
               <ClientImage className="w-auto" src={imagePath} pageUrl={PAGE_URL} alt={title} width={200} height={200} />
            </Suspense>
         </figure>
         <div className='card-body'>
            <h2 className='card-title text-2xl'>{title}</h2>
            <div className="text-[0.8rem] text-black/40">Source: {sources}</div>
            <div className="mb-8 uppercase font-semibold badge badge-warning rounded-[0]">{type}</div>
            <div className=''>
               <button onClick={() => deleteMenuItem(id)} className='btn btn-outline btn-error'>Remove</button>
            </div>
         </div>
      </div>
   )
}

export default MenuItem

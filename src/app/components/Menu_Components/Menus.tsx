'use client'

import { useMenuContext } from '@/lib/context/MenuContextProvider'
import { TMenuItem } from '@/lib/types'
import { useState, useEffect } from 'react'

import MenuItem from './MenuItem'
import Skeleton from '../Skeleton'
import Link from 'next/link'
const Menus = () => {
   const [isClient, setIsClient] = useState(false)
   const { menu }: { menu: TMenuItem[] } = useMenuContext()

   useEffect(() => {
      setIsClient(true)
   }, [])
   return (
      <div>
         <h2 className='text-center text-xl font-mono font-bold mb-8 capitalize'>
            Take a look at Your Menu
         </h2>
         <div className='custom-underline'></div>
         <div className='grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(512px,_1fr))]'>
            {isClient ? (menu ?? []).length > 0 ?
               menu?.map((el) => {
                  return <MenuItem key={el.id} {...el} />
               }) : <div className="flex text-center justify-center items-center flex-col gap-2">
                  <h3 className="font-semibold">You have not picked anything for your menu yet.</h3>
                  <p>Go to your recipes and add some dishes...</p>
                  <Link href="/recipes"><button className="btn btn-primary">Recipes</button></Link>
               </div> : 
               <div className="flex justify-around mx-auto w-full">
                  <Skeleton />
                  <Skeleton />
               </div>
               }
         </div>
      </div>
   )
}

export default Menus

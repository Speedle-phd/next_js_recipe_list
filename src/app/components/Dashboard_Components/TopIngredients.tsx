import React from 'react'
import { cn } from '@/lib/utils'

type PTopIngredients = React.HTMLAttributes<HTMLDivElement> & {
   topThree: { [key: string]: number }[]
}

const TopIngredients = ({ className, topThree }: PTopIngredients) => {
   return (
      <div className={cn(className, 'glass p-4 rounded-box')}>
         <h2 className='font-semibold text-lg text-center text-black/60'>
            Mostly used ingredients
         </h2>
         <div className='divider'></div>
         <div className='flex items-center bg-zinc-100 rounded-box'>
            <ul className="menu">
               <li>
                  <h2 className="menu-title text-black/70">Top Three:</h2>
                  <ul>
               <li><p className="capitalize"><span className="mr-8 text-yellow-200 font-extrabold text-3xl">1</span>{topThree[0].name}</p></li>
               <li><p className="capitalize"><span className="mr-8 text-zinc-300 font-extrabold text-3xl">2</span>{topThree[1].name}</p></li>
               <li><p className="capitalize"><span className="mr-8 text-amber-700 font-extrabold text-3xl">3</span>{topThree[2].name}</p></li>
               </ul>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default TopIngredients

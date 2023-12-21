import prisma from '@/lib/db'
import { headers } from 'next/headers'
import React from 'react'
import AmountTile from './AmountTile'
import heroImage from '/public/images/hero.jpg'
import Image from 'next/image'
import FrequencyPieTile from './FrequencyPieTile'

type TTypeGroupKeys = 'meat' | 'vegetarian' | 'vegan'

const StatisticsGrid = async () => {
   const header = headers()
   const userId = header.get('x-userid')
   const data = await prisma.recipe.findMany({
      where: {
         authorId: userId,
      },
   })

   function getAverage(array: { rank: number }[]) {
      return (
         array.reduce((total, curr) => {
            total += curr.rank
            return total
         }, 0) / array.length
      )
   }

   const length = data.length
   const totalAvg = getAverage(data)
   const typeGroups: { [Property in TTypeGroupKeys]?: typeof data } =
      data.reduce((total, curr) => {
         const types = ['meat', 'vegetarian', 'vegan']
         const type = curr.tags.split(', ').find((el) => types.includes(el))
         if (Array.isArray(total[type])) {
            total[type].push(curr)
         } else {
            total[type] = [curr]
         }

         return total
      }, {})
   const meatAmount = typeGroups.meat?.length ?? 0
   const vegetarianAmount = typeGroups.vegetarian?.length ?? 0
   const veganAmount = typeGroups.vegan?.length ?? 0
   const meatAvg = getAverage(typeGroups.meat ?? [{ rank: 0 }])
   const vegetarianAvg = getAverage(typeGroups.vegetarian ?? [{ rank: 0 }])
   const veganAvg = getAverage(typeGroups.vegan ?? [{ rank: 0 }])

   return (
      <div
         style={{
            backgroundImage: `url(${heroImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
         }}
         className='flex flex-wrap gap-4 p-14 rounded-box mx-auto'
      >
         <AmountTile
            meatAmount={meatAmount}
            length={length}
            veganAmount={veganAmount}
            vegetarianAmount={vegetarianAmount}
            className="lg:basis-[calc(50%-1rem)]"
         />
         <FrequencyPieTile 
            className="lg:basis-[calc(50%-1rem)]"
         />
      </div>
   )
}

export default StatisticsGrid

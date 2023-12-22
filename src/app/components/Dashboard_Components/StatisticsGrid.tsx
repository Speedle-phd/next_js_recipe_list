import prisma from '@/lib/db'
import { headers } from 'next/headers'
import React from 'react'
import AmountTile from './AmountTile'
import heroImage from '/public/images/hero.jpg'

import FrequencyPieTile from './FrequencyPieTile'
import AverageRank from './AverageRank'
import TopIngredients from './TopIngredients'

type TTypeGroupKeys = 'meat' | 'vegetarian' | 'vegan'

const StatisticsGrid = async () => {
   const header = headers()
   const userId = header.get('x-userid')
   const types = ['meat', 'vegetarian', 'vegan']
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
         const type = curr.tags.split(', ').find((el) => types.includes(el))
         if (Array.isArray(total[type])) {
            total[type].push(curr)
         } else {
            total[type] = [curr]
         }

         return total
      }, {})

   const ingredientsByAmount = data.reduce((total, curr) => {
      const tagsArr = curr.tags.split(', ')
      if(tagsArr.length < 1) return
      tagsArr.forEach(el => {
         if(!types.includes(el)){
            const isThere = total.find(ingredient => ingredient.name === el)
            if(!isThere){
               total.push({name: el, amount: 1})
            } else {
               isThere.amount++
            }
         }
      })
      return total
   },[])
   const topThreeIngredients = ingredientsByAmount.toSorted((a, b) => b.amount - a.amount).toSpliced(3)

   const meatAmount = typeGroups.meat?.length ?? 0
   const vegetarianAmount = typeGroups.vegetarian?.length ?? 0
   const veganAmount = typeGroups.vegan?.length ?? 0
   const meatAvg = (getAverage(typeGroups.meat ?? [{ rank: 0 }]))
   const vegetarianAvg = (getAverage(typeGroups.vegetarian ?? [{ rank: 0 }]))
   const veganAvg = (getAverage(typeGroups.vegan ?? [{ rank: 0 }]))
   
   let pieChartData;
   if(length !== 0) {
      const meatPercent = +(meatAmount / length * 100).toFixed(2)
      const vegetarianPercent = +(vegetarianAmount / length * 100).toFixed(2)
      const veganPercent = +(veganAmount / length * 100).toFixed(2)
      pieChartData = [
         {name: "Carnivore", value: meatPercent},
         {name: "Vegetarian", value: vegetarianPercent},
         {name: "Vegan", value: veganPercent}
      ]
   } else {
      const meatPercent = +(meatAmount / 1 * 100).toFixed(2)
      const vegetarianPercent = +(vegetarianAmount / 1 * 100).toFixed(2)
      const veganPercent = +(veganAmount / 1 * 100).toFixed(2)
      pieChartData = [
         {name: "Carnivore", value: meatPercent},
         {name: "Vegetarian", value: vegetarianPercent},
         {name: "Vegan", value: veganPercent}
      ]
   }
   return (
      <div
         style={{
            backgroundImage: `url(${heroImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
         }}
         className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 md:p-14 rounded-box mx-auto'
      >
         <AmountTile
            meatAmount={meatAmount}
            length={length}
            veganAmount={veganAmount}
            vegetarianAmount={vegetarianAmount}
            className='lg:basis-[calc(50%-2rem)]'
         />
         <FrequencyPieTile
            className='lg:basis-[calc(50%-2rem)]'
            pieData={pieChartData}
         />
         <AverageRank className='lg:basis-[calc(50%-2rem)]'
            totalAvg={totalAvg}
            meatAvg={meatAvg}
            vegetarianAvg={vegetarianAvg}
            veganAvg={veganAvg}
         />
         <TopIngredients className="lg:basis-[calc(50%-2rem)]"
         topThree={topThreeIngredients}
         />
      </div>
   )
}

export default StatisticsGrid

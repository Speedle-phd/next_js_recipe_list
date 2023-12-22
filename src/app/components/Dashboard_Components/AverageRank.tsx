'use client'

import React, { useState, useEffect } from 'react'
// import { flushSync } from 'react-dom'
import { cn, sleep } from '@/lib/utils'
type PAverageRank = React.HTMLAttributes<HTMLDivElement> & {
   totalAvg: number
   meatAvg: number
   vegetarianAvg: number
   veganAvg: number
}

type TActiveCategory = 'all' | 'carnivore' | 'vegetarian' | 'vegan'

const AverageRank = ({ className, totalAvg, meatAvg, veganAvg, vegetarianAvg }: PAverageRank) => {
   const [activeCategory, setActiveCategory] = useState<TActiveCategory>(null)
   const [rating, setRating] = useState(aproxRankingValue(totalAvg))
   const [disabled, setDisabled] = useState(false)

   const functionPicker = {
      'all': () => {setRating(aproxRankingValue(totalAvg))},
      'carnivore': () => {setRating(aproxRankingValue(meatAvg))},
      'vegetarian': () => {setRating(aproxRankingValue(vegetarianAvg))},
      'vegan': () => {setRating(aproxRankingValue(veganAvg))},
   }


   const handleCategory = async (cat: TActiveCategory) => {
      setDisabled(true)
      setActiveCategory(null)
      await sleep(500)
      console.log('wait')
      setActiveCategory(cat)   
      const setRating = functionPicker[cat]
      setRating()
      setDisabled(false)
   }
   function aproxRankingValue (value: number) {
      return value - (value % 0.5)
   }

   useEffect(() => {
      setActiveCategory('all')
   }, [])

   return (
      <div className={cn(className, 'glass p-4 rounded-box')}>
         <h2 className='font-semibold text-lg text-center text-black/60'>
            Average Category Rating
         </h2>
         <div className='divider'></div>
         <div className='flex justify-center items-center bg-zinc-100 rounded-box'>
            <div className='rating rating-half p-4'>
               <input type='radio' name='rating-10' 
                  className='rating-hidden'
                  checked={rating === 0}
                  readOnly={true}
                  />
               <input
                  type='radio'
                  name='rating-10'
                  className='bg-orange-400 mask mask-heart  mask-half-1'
                  checked={rating === 0.5}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-2'
                  checked={rating === 1}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform i-1 bg-orange-400 mask mask-heart  mask-half-1 translate-x-[calc(var(--i)*200%)]'
                  checked={rating === 1.5}
                  readOnly={true}
                  
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform i-1 bg-orange-400 mask mask-heart  mask-half-2 translate-x-[calc(var(--i)*200%)]'
                  checked={rating === 2}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-1 translate-x-[calc(var(--i)*200%)] i-2'
                  checked={rating === 2.5}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-2 translate-x-[calc(var(--i)*200%)] i-2'
                  checked={rating === 3}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-1 translate-x-[calc(var(--i)*200%)] i-3'
                  checked={rating === 3.5}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-2 translate-x-[calc(var(--i)*200%)] i-3'
                  checked={rating === 4}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-1 translate-x-[calc(var(--i)*200%)] i-4'
                  checked={rating === 4.5}
                  readOnly={true}
               />
               <input
                  type='radio'
                  name='rating-10'
                  style={activeCategory && { transform: 'translate(0)' }}
                  className='transition-transform bg-orange-400 mask mask-heart  mask-half-2 translate-x-[calc(var(--i)*200%)] i-4'
                  checked={rating === 5}
                  readOnly={true}
               />
            </div>
         </div>
         <div className='grid grid-cols-2 gap-2 mt-4'>
            <button
               disabled={disabled}
               onClick={() => handleCategory('all')}
               className={`btn btn-xs ${
                  activeCategory === 'all' ? 'bg-primary' : ''
               }`}
            >
               All
            </button>
            <button
               disabled={disabled}
               onClick={() => handleCategory('carnivore')}
               className={`btn btn-xs ${
                  activeCategory === 'carnivore' ? 'bg-primary' : ''
               }`}
            >
               Carnivore
            </button>
            <button
               disabled={disabled}
               onClick={() => handleCategory('vegetarian')}
               className={`btn btn-xs ${
                  activeCategory === 'vegetarian' ? 'bg-primary' : ''
               }`}
            >
               Vegetarian
            </button>
            <button
               disabled={disabled}
               onClick={() => handleCategory('vegan')}
               className={`btn btn-xs ${
                  activeCategory === 'vegan' ? 'bg-primary' : ''
               }`}
            >
               Vegan
            </button>
         </div>
      </div>
   )
}

export default AverageRank

'use client'

import {cn} from '@/lib/utils'
import React from 'react'

import CountUp from 'react-countup'

type PAmountTile = React.HTMLAttributes<HTMLDivElement> & {
   
      length: number
      meatAmount: number
      veganAmount: number
      vegetarianAmount: number
   
}

const AmountTile = ({
   length,
   meatAmount,
   veganAmount,
   vegetarianAmount,
   className
}: PAmountTile) => {
   const DURATION = 2
   // const maxCount = 10000
   // const [count, setCount] = useState(0)
   // useEffect(() => {
   //    const currentCount = count
   //    const steps = maxCount / (DURATION * 1000)
   //    const timer = setInterval(() => {
   //       console.log(steps, count, maxCount, currentCount)
   //       if(count < maxCount){
   //          setCount((prev) => prev + steps)
   //       } else {
   //          setCount(maxCount)
   //          clearInterval(timer)
   //       }
   //    }, (count / (maxCount - count) - 500))
   //    return () => clearInterval(timer)
   // },[count])



   return (
      
         <div className={cn(className,'stats stats-vertical glass')}>
            <div className='stat !min-w-0'>
               <div className='stat-title text-center font-semibold text-lg whitespace-break-spaces'>
                  Total dishes to choose from
               </div>
               <div className='stat-value text-center'>
                  <CountUp
                     start={0}
                     end={length}
                     duration={DURATION}
                     useEasing={true}
                  />
               </div>
            </div>
            <div className='stats max-sm:stats-vertical'>
               <div className='stat place-items-center !min-w-0'>
                  <div className='stat-title text-[0.7rem]'>Carnivore</div>
                  <div className='stat-value'>
                     <CountUp
                        start={0}
                        end={meatAmount}
                        duration={DURATION}
                        useEasing={true}
                     />
                  </div>
               </div>

               <div className='stat place-items-center !min-w-0'>
                  <div className='stat-title text-[0.7rem]'>Vegetarian</div>
                  <div className='stat-value'>
                     {' '}
                     <CountUp
                        start={0}
                        end={vegetarianAmount}
                        duration={DURATION}
                        useEasing={true}
                     />
                  </div>
               </div>

               <div className='stat place-items-center !min-w-0'>
                  <div className='stat-title text-[0.7rem]'>Vegan</div>
                  <div className='stat-value'>
                     {' '}
                     <CountUp
                        start={0}
                        end={veganAmount}
                        duration={DURATION}
                        useEasing={true}
                     />
                  </div>
               </div>
            </div>
         </div>
      
   )
}

export default AmountTile

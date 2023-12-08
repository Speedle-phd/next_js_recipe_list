"use client"

import { ingredientsArray, cn } from "@/lib/utils"

import { UseFormRegister } from "react-hook-form"


type PIngredientsPicker = React.HTMLAttributes<HTMLElement> & {
   register: UseFormRegister<{
      title?: string
      sources?: string
      type?: 'meat' | 'vegetarian' | 'vegan'
      ingredients?: boolean | string[]
   }>
}
const IngredientsPicker = ({
   register, className
}: PIngredientsPicker) => {

   const groupedIngredients = ingredientsArray.reduce((total, curr) => {
      if(curr.type in total){
         total[curr.type].push(curr)
      } else {
         total[curr.type] = [curr]
      }
      return total
   },{})

   
   // const groupedIngredients = Object.groupBy(ingredientsArray, el => el.type)
   

   const groupedArray = [...Object.entries(groupedIngredients)]

   const handleKeyDown = (e: React.KeyboardEvent) => {
      const label = e.target as HTMLLabelElement
      if(e.key === "Space" || e.key === "Enter"){
         (label.previousSibling as HTMLInputElement).checked = !(label.previousSibling as HTMLInputElement).checked
      }
   }

   return (
      <ul className={cn(className, 'menu menu-horizontal bg-base-200 rounded-box')}>
         {groupedArray.map((el, index) => {
            const group = el[0]
            return (
               <li
                  className='uppercase font-sm font-semibold font-mono text-accent'
                  key={index}
               >
                  {group}
                  <ul>
                     {(el[1] as { name: string }[]).sort((a, b) => a.name.localeCompare(b.name)).map((el, index) => {
                        return (
                           <li key={index} className="mb-1">
                              <input
                                 className="hidden checked-checkbox"
                                 type='checkbox'
                                 {...register('ingredients')}
                                 id={el.name}
                                 value={el.name}
                              />
                              <label onKeyDown={handleKeyDown} tabIndex={0} className="font-sans font-xs text-black capitalize focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black" htmlFor={el.name}>
                                 {el.name.replace('-', ' ')}
                                 
                              </label>
                           </li>
                        )
                     })}
                  </ul>
               </li>
            )
         })}
      </ul>
   )
}

export default IngredientsPicker

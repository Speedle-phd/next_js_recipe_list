'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TFilterRecipeSchema, filterRecipeSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { toast } from 'react-toastify'
const FilterForm = () => {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting, errors },
   } = useForm<TFilterRecipeSchema>({
      resolver: zodResolver(filterRecipeSchema),
   })


   const onSubmit = (data: TFilterRecipeSchema) => {
      console.log(data)
      const url = new URL(location.href)
      for(let entry in data){
         url.searchParams.set(entry, data[entry])
      }
      router.push(url.href)
      reset()
      // revalidateTag('recipes')
   }

   useEffect(() => {
      for(let error in errors){
         
         if(errors[error]?.message){
            toast.error(errors[error]?.message)
         }
      }
      
      //errors.rank.message
   }, [errors])

   return (
      <form
         className='w-[max(100%,_18rem)] mx-auto relative px-8 py-4 grid gap-4 grid-cols-[repeat(auto-fit,minmax(255px,1fr))]'
         onSubmit={handleSubmit(onSubmit)}
      >
         <h3
            className='w-fit whitespace-nowrap absolute rotate-[270deg] top-[0] right-[100%]
               translate-x-[50%] translate-y-[300%] font-mono font-semibold tracking-wider
               '
         >
            Make a selection
         </h3>
         <div className='grid'>
            <label className='text-[0.7rem] capitalize' htmlFor='title'>
               Query for title...
            </label>
            <input
               className='text-zinc-200 px-4 py-2'
               type='text'
               {...register('title')}
               id='title'
            />
         </div>
         <div className='grid'>
            <label className='text-[0.7rem] capitalize' htmlFor='sources'>
               Query for source...
            </label>
            <input
               className='text-zinc-200 px-4 py-2'
               type='text'
               {...register('sources')}
               id='sources'
            />
         </div>
         <div className='grid'>
            <label className='text-[0.7rem] capitalize' htmlFor='ingredients'>
               Query for ingredients...
            </label>
            <input
               className='text-zinc-200 px-4 py-2'
               type='text'
               {...register('ingredients')}
               id='ingredients'
            />
         </div>
         <fieldset className='flex flex-wrap gap-2 items-center'>
            <div className='radio-control '>
               <input
                  className='checked-checkbox'
                  hidden
                  // defaultChecked
                  value='meat'
                  type='radio'
                  {...register('type')}
                  id='radio-btn-type-meat'
               />
               <label
                  tabIndex={0}
                  className='focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black px-4 py-2 rounded-md bg-zinc-200 font-semibold text-sm'
                  htmlFor='radio-btn-type-meat'
               >
                  Meat
               </label>
            </div>
            <div className='radio-control'>
               <input
                  className='checked-checkbox'
                  hidden
                  value='vegetarian'
                  type='radio'
                  {...register('type')}
                  id='radio-btn-type-vegetarian'
               />
               <label
                  tabIndex={0}
                  className='focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black px-4 py-2 rounded-md bg-zinc-200 font-semibold text-sm'
                  htmlFor='radio-btn-type-vegetarian'
               >
                  Vegetarian
               </label>
            </div>
            <div className='radio-control'>
               <input
                  className='checked-checkbox'
                  hidden
                  value='vegan'
                  type='radio'
                  {...register('type')}
                  id='radio-btn-type-vegan'
               />
               <label
                  tabIndex={0}
                  className='focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black px-4 py-2 rounded-md bg-zinc-200 font-semibold text-sm'
                  htmlFor='radio-btn-type-vegan'
               >
                  Vegan
               </label>
            </div>
         </fieldset>
         <div>
            <label className='text-[0.7rem] capitalize' htmlFor='rank'>
               Filter for deliciousness
            </label>
            <input
               type='range'
               {...register('rank')}
               min='0'
               max='5'
               defaultValue='0'
               step='0.5'
               className='range range-warning'
               id='rank'
            />
            <div className='w-full flex justify-between text-xs px-2'>
               <span>|</span>
               <span>|</span>
               <span>|</span>
               <span>|</span>
               <span>|</span>
            </div>
         </div>
         <button className="btn btn-primary" type="submit">
            {isSubmitting ? <div className="loading loading-ring"></div> : "Apply"}
         </button>
      </form>
   )
}

export default FilterForm

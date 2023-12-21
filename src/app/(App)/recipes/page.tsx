export const dynamic = "force-dynamic"

import Pagination from '@/app/components/Recipes_Components/Pagination'
import RecipeCard from '@/app/components/Recipes_Components/RecipeCard'
import { headers } from 'next/headers'
// import { createInspector, filterByExtension } from 'fs-inspect'
// import { homedir } from 'os'
import Image from 'next/image'
import plate from '@/../public/images/plate.jpg'
import Link from 'next/link'
import FilterForm from '@/app/components/Recipes_Components/FilterForm'
const Recipes = async ({ searchParams }) => {
   const queryString = new URLSearchParams(searchParams).toString()
   const pageUrl = process.env.PAGE_URL
   const url = `${pageUrl}/api/recipes?${queryString}`
   const userId = headers().get('x-userid')
   const res = await fetch(url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'x-userid': userId,
      },

      next: { tags: ['recipes'], revalidate: 3600 },
   })
   const { hasLess, hasMore, recipesArr, maxPages } = await res.json()

   //try find images
   // const {search} = createInspector({filter: filterByExtension(['png']), type: 'all'})
   // const imageFiles = await search(`${process.cwd()}/`)
   // console.log(imageFiles)


   return (
      <>
         <h2 className='text-center text-xl font-mono font-bold mb-8'>
            Browse throu your recipes...
         </h2>
         <div className='custom-underline'></div>
         <section
            className='
         min-h-[10rem] my-8
         '
         >
            <FilterForm />
         </section>
         <section>
            <div className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
               {recipesArr.length === 0 ? (
                  <div className='flex flex-col items-center gap-2'>
                     <Image
                        src={plate}
                        alt={'empty plate'}
                        width={200}
                        height={200}
                        className={'object-center object-cover aspect-square'}
                     />
                     <div className='text-center'>
                        Nothing to eat yet...
                        <br />
                        Go to &quot;Add new Recipe&quot; and pull out some
                        dishes.
                     </div>
                     <Link href='/add-recipe'>
                        <button className='btn btn-primary'>
                           Add some recipes
                        </button>
                     </Link>
                  </div>
               ) : (
                  recipesArr.map((el) => {
                     const imagePath = el.image ? `/uploads/${el.image}` : null
                     const tagsArr = el.tags.split(', ')
                     return (
                        <RecipeCard
                           width={300}
                           tagsArr={tagsArr}
                           imagePath={imagePath}
                           key={el.id}
                           {...el}
                        />
                     )
                  })
               )}
            </div>
            <Pagination
               hasLess={hasLess}
               hasMore={hasMore}
               maxPages={maxPages}
               className='mt-8 w-full'
            />
         </section>
      </>
   )
}

export default Recipes

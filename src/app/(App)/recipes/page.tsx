
import prisma from "@/lib/db"
import { headers } from "next/headers"
import Image from "next/image"

const Recipes = async({searchParams}) => {
   const {page} = searchParams
   const skip = page ? (+page - 1) : 0
   const hasLess = skip === 0 ? false : true
   const userId = headers().get('x-userid')
   const length = await prisma.recipe.findMany({where: {authorId: userId}}).then((data => data.length))
   const hasMore = ((skip + 1) * 10 > length) ? false : true

   const recipesArr = await prisma.recipe.findMany({
      where: {
         authorId: userId
      },
      skip: skip,
      take: 10,
      orderBy: {
         title: 'asc'
      }
   })
   console.log(recipesArr)
   console.log(hasMore)
   console.log(hasLess)
   

   return (
      <div>
         {recipesArr.map(el => {
            const imagePath = `/uploads/${el.image}`
            const {title, sources, tags, rank, id} = el
            const tagsArr = tags.split(", ")
            return (
               <div key={id}>
                  <h2>{title}</h2>
                  <p>{sources}</p>
                  <Image src={imagePath} alt={title} width={200} height={200} />
                  <p>{rank}</p>
               </div>
            )
         })}
      </div>
   )
}

export default Recipes

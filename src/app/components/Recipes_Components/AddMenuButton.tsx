'use client'
import  {
   useMenuContext,
} from '@/lib/context/MenuContextProvider'
import { MdOutlineRestaurantMenu } from 'react-icons/md'

type PAddMenuButton = {
   addMenuButtonProps: {
      id: string
      title: string
      sources: string
      imagePath: string
      tagsArr: string[]
      PAGE_URL: string
   }
}


const AddMenuButton = ({addMenuButtonProps} : PAddMenuButton ) => {
   const {addMenuItem} = useMenuContext()

   return (

         <button onClick={() => addMenuItem(addMenuButtonProps)} className='btn btn-sm btn-primary text-[clamp(0.6rem,0.5vw_+_0.4rem,0.9rem)]'>
            <MdOutlineRestaurantMenu />
            Add to menu
         </button>

   )
}

export default AddMenuButton

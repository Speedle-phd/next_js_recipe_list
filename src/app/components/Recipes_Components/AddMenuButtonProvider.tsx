"use client"

import React from 'react'
import MenuContextProvider, {

} from '@/lib/context/MenuContextProvider'
import AddMenuButton from './AddMenuButton'

type PAddMenuButtonProvider = {
   addMenuButtonProps: {
      id: string
      title: string
      sources: string
      imagePath: string
      tagsArr: string[]
      PAGE_URL: string
   }
}

const AddMenuButtonProvider = ({addMenuButtonProps}: PAddMenuButtonProvider) => {
  return (
     <MenuContextProvider>
        <AddMenuButton addMenuButtonProps={addMenuButtonProps} />
     </MenuContextProvider>
  )
}

export default AddMenuButtonProvider

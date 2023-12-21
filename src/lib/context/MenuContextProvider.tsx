"use client"

import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TMenuItem } from '../types'
import { toast } from 'react-toastify'

type MenuContext = {
   menu: TMenuItem[]
   addMenuItem: (menuItem: TMenuItem) => void
   deleteMenuItem: (id: string) => void  
}

const MenuContext = createContext<MenuContext | null>(null)

const MenuContextProvider = ({children}: React.PropsWithChildren) => {
   const {storage: menu, changeStorage: setMenu} = useLocalStorage<TMenuItem>([], "panda-menu")
   

   const addMenuItem = (menuItem : TMenuItem) => {
      const {id} = menuItem
      const isThere = menu?.find(item => id === item.id)
      if(isThere){
         toast.info('Dish already on your menu')
      } else {
         setMenu([...menu, menuItem])
         toast.success('Dish successfully added.')
      }
   }
   const deleteMenuItem = (id: string) => {
      const filteredArr = menu.filter(el => el.id !== id)
      setMenu(filteredArr)
      toast.success('Dish successfully removed from your menu.')
   }


   
  return (
    <MenuContext.Provider value={{
      menu,
      addMenuItem,
      deleteMenuItem
    }}>
      {children}
    </MenuContext.Provider>
  )
}


export const useMenuContext = () => {
   return useContext(MenuContext)
}

export default MenuContextProvider

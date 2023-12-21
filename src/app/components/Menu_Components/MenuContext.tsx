"use client"

import MenuContextProvider from "@/lib/context/MenuContextProvider"
import Menus from "./Menus"

const MenuContext = () => {
  return (
    <MenuContextProvider>
      <Menus />
    </MenuContextProvider>
  )
}

export default MenuContext

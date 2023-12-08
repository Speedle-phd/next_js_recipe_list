'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLinks = () => {
   const pathname = usePathname()
   console.log(pathname)
   return (
      <>
         <li>
            <Link
               className={`${
                  pathname.startsWith('/dashboard') ? 'bg-base-100' : null
               }`}
               href='/dashboard'
            >
               Dashboard
            </Link>
         </li>
         <li>
            <Link
               className={`${
                  pathname.startsWith('/recipes') ? 'bg-base-100' : null
               }`}
               href='/recipes'
            >
               Your Recipes
            </Link>
         </li>
         <li>
            <Link
               className={`${
                  pathname.startsWith('/add-recipe') ? 'bg-base-100' : null
               }`}
               href='/add-recipe'
            >
               Add new Recipe
            </Link>
         </li>
         <li>
            <Link
               className={`${
                  pathname.startsWith('/settings') ? 'bg-base-100' : null
               }`}
               href='/settings'
            >
               Settings
            </Link>
         </li>
      </>
   )
}

export default NavLinks

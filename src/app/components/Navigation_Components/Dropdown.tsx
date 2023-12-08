'use client'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { FaHamburger, FaPowerOff } from 'react-icons/fa'
import Link from 'next/link'
import NavLinks from './NavLinks'
const Dropdown = () => {
   const router = useRouter()
   const cookieStore = new Cookies()
   const handleLogout = () => {
      cookieStore.remove('panda-recipes-auth', { path: '/' })
      router.push('/login')
      toast.success('Successfull logged out.')
   }
   return (
      <div className='dropdown dropdown-bottom dropdown-end lg:hidden'>
         <div tabIndex={0} role='button'>
            <FaHamburger className='text-3xl text-primary' />
         </div>
         <ul
            tabIndex={0}
            className='dropdown-content menu z-[1] rounded-md w-52 shadow p-2 bg-base-100'
         >
            <li>
               <span className='text-accent font-semibold font-mono text-xs'>
                  Navigation
               </span>
               <ul>
                  <NavLinks />
               </ul>
            </li>
            <li>
               <span className='text-accent font-semibold font-mono text-xs'>
                  Logout
               </span>
               <ul>
                  <li>
                     <Link onClick={handleLogout} href='#'>
                        <FaPowerOff className='text-2xl text-red-400' />
                     </Link>
                  </li>
               </ul>
            </li>
         </ul>
      </div>
   )
}

export default Dropdown

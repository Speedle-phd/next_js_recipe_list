import React from 'react'
import logo from '/public/images/Lvo1gzjph7qd81tpvm26.webp'
import Image from 'next/image'
import Dropdown from './Navigation_Components/Dropdown'
import LogoutButtonClient from './CustomComponents/LogoutButtonClient'
import NavLinks from './Navigation_Components/NavLinks'

const Header = () => {
   return (
      <nav className='bg-white p-8 flex justify-between items-center'>
         <div className='flex gap-2 items-center'>
            <Image
               src={logo}
               alt='logo'
               width={100}
               height={100}
               priority={true}
               className='w-[50px] object-cover object-center md:w-[100px]'
            />
            <h2 className='font-mono text-lg md:text-2xl tracking-[-2px] capitalize font-semibold'>
               {"Panda's recipes"}
            </h2>
         </div>
         <Dropdown />
         <div className='hidden lg:flex join max-h-12'>
            <ul className='join-item menu menu-horizontal bg-primary rounded-lg'>
               <NavLinks />
            </ul>
            <LogoutButtonClient className='join-item pt-4 pb-3' />
         </div>
      </nav>
   )
}

export default Header

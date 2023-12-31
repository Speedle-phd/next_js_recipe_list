'use client'

import React, { useState } from 'react'
import LoginForm from './LoginFormClient'
import RegisterForm from './RegisterFormClient'
import { cn } from '../../../lib/utils'
import GuestLogin from './GuestLogin'
import ForgotPasswordClient from './ForgotPasswordClient'

type PLoginCard = React.HTMLAttributes<HTMLDivElement>

const LoginCard = ({ className, ...props }: PLoginCard) => {
   const [isLogin, setIsLogin] = useState(true)
   return (
      <div
         {...props}
         className={cn(
            className,
            'bg-stone-900/70 text-base-100 p-8 lg:p-16 rounded-box min-w-[15rem]'
         )}
      >
         <header>
            <h2 className='font-bold text-3xl text-center'>
               {isLogin ? 'Login' : 'Register'}
            </h2>
            <div className='custom-underline'></div>
         </header>
         {isLogin ? (
            <>
               <LoginForm />
               <p className='mt-4 text-xs'>{"Don't have an account yet?"}</p>
               <p
                  onClick={() => setIsLogin(!isLogin)}
                  role='button'
                  tabIndex={0}
                  className='text-xs font-semibold text-primary underline cursor-pointer hover:text-accent focus-visible:text-accent transition-colors outline-none'
               >
                  Register now.
               </p>
               <ForgotPasswordClient />
               <div className='text-[0.6rem] mt-8'>
                  <div className='flex justify-between items-start'>
                     <GuestLogin />
                     <header>
                        <h3>Just curious?</h3>
                        <p className='mb-2'>Take a peak with the guest user.</p>
                     </header>
                  </div>
               </div>
            </>
         ) : (
            <>
               <RegisterForm />
               <p className='mt-4 text-xs'>Already have an account?</p>
               <p
                  onClick={() => setIsLogin(!isLogin)}
                  role='button'
                  tabIndex={0}
                  className='text-xs font-semibold text-primary underline cursor-pointer hover:text-accent focus-visible:text-accent transition-colors outline-none'
               >
                  Login now.
               </p>
            </>
         )}
      </div>
   )
}

export default LoginCard

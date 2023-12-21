'use client'

import { patchPassword } from '@/lib/actions'
import React, { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'react-toastify'

type PPatchPasswordForm = {
   userId: string
}

const initialState = {
   message: [],
   success: null,
}

const PatchPasswordForm = ({ userId }: PPatchPasswordForm) => {
   const formRef = useRef<HTMLFormElement>(null)
   const updatePasswordWithId = patchPassword.bind(null, userId)
   const [state, formAction] = useFormState<{
      message?: string[]
      success: boolean
   }>(updatePasswordWithId, initialState)
   const { pending } = useFormStatus()
   useEffect(() => {
      if ('message' in state && state?.message?.length > 0) {
         state?.message.forEach((message) => {
            toast.error(message)
         })
      } else if (state?.success) {
         toast.success('Successfully updated your password.')
         formRef.current.reset()
      }
   }, [state])

   return (
      <form ref={formRef} action={formAction} className='grid gap-2'>
         <div className='grid text-zinc-200'>
            <label
               className='text-neutral text-[0.7rem] font-semibold'
               htmlFor='password'
            >
               New Password
            </label>
            <input className='p-2' type='password' id='password' name='password' />
         </div>
         <div className='grid text-zinc-200'>
            <label
               className='text-neutral text-[0.7rem] font-semibold'
               htmlFor='confirm-password'
            >
               Confirm Password
            </label>
            <input
               className='p-2'
               type='password'
               id='confirm-password'
               name='confirm-password'
            />
         </div>
         <button type='submit' disabled={pending} className='btn btn-primary'>
            {pending ? (
               <div className='loading loading-ring'></div>
            ) : (
               'Change your password'
            )}
         </button>
      </form>
   )
}

export default PatchPasswordForm

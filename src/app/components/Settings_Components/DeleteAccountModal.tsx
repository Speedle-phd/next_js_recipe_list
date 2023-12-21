'use client'
import React, { forwardRef } from 'react'
import useClickOutside from '@/lib/hooks/useClickOutside'
import { getErrorMessage } from '@/lib/utils'
import { toast } from 'react-toastify'
import {useRouter} from 'next/navigation'
import Cookies from 'universal-cookie'
import { useFormStatus } from 'react-dom'
type PDeleteAccountModal = React.HTMLAttributes<HTMLDivElement> & {
   closeModal: () => void
   email: string
}

const DeleteAccountModal = forwardRef<
   HTMLDivElement | null,
   PDeleteAccountModal
>(({ closeModal, email }, ref) => {
   //@ts-ignore
   useClickOutside(ref, closeModal)
   const router = useRouter()
   const cookieStore = new Cookies()
   const {pending} = useFormStatus()
   const handleDelete = async(e: React.FormEvent) => {
      e.preventDefault()
      
      const formData = new FormData(e.target as HTMLFormElement)
      const inputEmail = formData.get('email') as string
      try {
         if(typeof inputEmail !== "string"){
            throw new Error('Invalid format')
         } else if(inputEmail === ""){
            throw new Error('Please provide your email address.')
         } else if(inputEmail !== email) {
            throw new Error('Email doesn\'t match.')
         } else {
            const response = await fetch('/api/settings', {
               method: "DELETE",
               body: JSON.stringify(email)
            })
            const {success, message} = await response.json()
            if(success){
               toast.success('Successfully deleted your account')
               cookieStore.remove('panda-recipes-auth', {path: "/"})
               router.push('/')
            } else {
               throw new Error(message)
            }
         }
      } catch(err){
         toast.error(getErrorMessage(err))
      }
   }

   return (
      <div
         ref={ref}
         className='fixed top-1/2 left-1/2
    translate-x-[-50%] translate-y-[-50%]
      p-8 bg-white shadow-xl border-md
    '
      >
         <form onSubmit={handleDelete} className='grid gap-4' action=''>
            <h2 className='text-center font-semibold'>
               Are you sure you want to delete your account?
            </h2>
            <div className='custom-underline !mb-2'></div>
            <p>
               If so type <i className='text-red-800'>&ldquo;{email}&rdquo;</i>{' '}
               into the following input field and confirm:
            </p>
            <input
               placeholder={'Type your email address...'}
               // pattern={email}
               className='p-2 border-lg text-zinc-200
         valid:border-primary border-4 invalid:border-red-500
         '
               type='text'
               name='email'
               id='email'
               
            />
            <div className='flex gap-4'>
               <button disabled={pending} type='submit' className='btn btn-outline btn-error'>
                  {pending ? <div className="loading loading-ring"></div>: "Confirm"}
               </button>
               <div
                  onClick={closeModal}
                  role={'button'}
                  className='btn btn-primary'
               >
                  Cancel
               </div>
            </div>
         </form>
      </div>
   )
})

DeleteAccountModal.displayName = 'DeleteAccountModal'

export default DeleteAccountModal

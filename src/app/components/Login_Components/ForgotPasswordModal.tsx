'use client'

import useClickOutside from "@/lib/hooks/useClickOutside"
import { TAuthResponse, TResetSchema, resetSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
import { close } from "inspector"
type PForgotPasswordModal = {
   closeModal: () => void
}

const ForgotPasswordModal = ({closeModal} : PForgotPasswordModal) => {
   const modalRef = useRef<HTMLDivElement | null>(null)
   useClickOutside(modalRef, closeModal)
   const router = useRouter()
   const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<TResetSchema>({
      resolver: zodResolver(resetSchema)
   })
   
   const onSubmit = async(data: TResetSchema) => {
      const response = await fetch('/api/reset', {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         }
      })
      const responseData : TAuthResponse = await response.json()
      if (responseData.success) {
         toast.success(
            'Successfully reseted your password. Please check your emails.'
         )
         router.push("/login")
         closeModal()
      } else {
         toast.error(`${responseData.statuscode} - ${responseData.message}`)
      }
   }
      useEffect(() => {
         if (Object.keys(errors).length > 0) {
            for (let key in errors) {
               //@ts-ignore
               toast.error(errors[key].message, { toastId: `${key}-error` })
            }
         }
      }, [errors])

   return (
      <div ref={modalRef} className='w-[20rem] min-h-[10rem] bg-zinc-200 rounded-box custom-modal shadow-xl flex justify-center items-center text-neutral py-8'>
         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <h2 className="text-center font-bold text-lg">Reset your Password</h2>
            <input
               className="h-8 px-4 rounded-sm text-zinc-200"
               type='email'
               {...register('email')}
               placeholder='Email address...'
            />
            <button disabled={isSubmitting} className='btn btn-primary'>{isSubmitting ? <div className="loading loading-ring"></div> : "Submit"}</button>
         </form>
      </div>
   )
}

export default ForgotPasswordModal

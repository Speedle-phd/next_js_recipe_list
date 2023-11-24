'use client'

import { TAuthResponse, TLoginSchema, loginSchema } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButtonClient from './SubmitButtonClient'

const LoginFormClient = () => {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      clearErrors
   } = useForm<TLoginSchema>({
      resolver: zodResolver(loginSchema),
   })
   
   const onSubmit = async (data: TLoginSchema) => {
      try {
         const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json',
            },
         })
         const responseData : TAuthResponse = await response.json()
         if(responseData?.statuscode){
            toast.error(`Statuscode: ${responseData.statuscode} - ${responseData.message!}`)
         }
         if(responseData?.errors){
            responseData.errors.forEach(error => {
               toast.error(error, {toastId: `${error}-id`})
            })
         }
         if(responseData.success){
            toast.success('Successfully logged in.')
            router.push('/dashboard')
         }
         
      } catch (error) {
         console.log(error)
      }
   }
   
   useEffect(() => {
      console.log(errors)
      if (Object.keys(errors).length > 0) {
         for (let key in errors) {
            //@ts-ignore
            toast.error(errors[key].message, { toastId: `${key}-error` })
         }
      }
   }, [errors, clearErrors])

   return (
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
         <input
            className='h-8 rounded-md px-4 placeholder:text-white/20 placeholder:text-xs'
            placeholder='Email...'
            type='email'
            {...register('email')}
         />
         <input
            className='h-8 rounded-md px-4 placeholder:text-white/20 placeholder:text-xs'
            placeholder='Password...'
            type='password'
            {...register('password')}
         />

         <SubmitButtonClient isSubmitting={isSubmitting}/>
      </form>
   )
}

export default LoginFormClient

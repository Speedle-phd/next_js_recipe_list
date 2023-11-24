'use client'

import { TAuthResponse, TRegisterSchema, registerSchema } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButtonClient from './SubmitButtonClient'

const RegisterFormClient = () => {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<TRegisterSchema>({
      resolver: zodResolver(registerSchema),
   })

   const onSubmit = async (data: TRegisterSchema) => {
      console.log(data)
      try {
         const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json',
            },
         })
         const responseData: TAuthResponse = await response.json()
         if (responseData?.statuscode) {
            toast.error(
               `Statuscode: ${
                  responseData.statuscode
               } - ${responseData.message!}`
            )
         }
         if (responseData?.errors) {
            responseData.errors.forEach((error) => {
               toast.error(error, { toastId: `${error}-id` })
            })
         }
         if (responseData.success) {
            toast.success('Successfully registered.')
            router.push('/dashboard')
         }
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      if (errors) {
         for (let key in errors) {
            //@ts-ignore
            toast.error(errors[key].message, { toastId: `${key}-error` })
         }
      }
   }, [errors])
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
         <input
            className='h-8 rounded-md px-4 placeholder:text-white/20 placeholder:text-xs'
            placeholder='Confirm Password...'
            type='password'
            {...register('confirmPassword')}
         />

         <SubmitButtonClient isSubmitting={isSubmitting} />
      </form>
   )
}

export default RegisterFormClient

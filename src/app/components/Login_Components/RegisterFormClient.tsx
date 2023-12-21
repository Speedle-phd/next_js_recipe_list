'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButtonClient from './SubmitButtonClient'
import { TRegisterSchema, registerSchema, TAuthResponse } from '../../../lib/types'
import { getErrorMessage } from '../../../lib/utils'

const RegisterFormClient = () => {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      clearErrors
   } = useForm<TRegisterSchema>({
      resolver: zodResolver(registerSchema),
   })

   const onSubmit = async (data: TRegisterSchema) => {
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
         } else {
            throw new Error(responseData.message)
         }
      } catch (error) {
         toast.error(getErrorMessage(error))
      }
   }

   useEffect(() => {
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

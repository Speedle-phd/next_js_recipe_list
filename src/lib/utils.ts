import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// import { AxiosError } from 'axios'
//TAILWIND HELPER FUNCTION IN ORDER TO MERGE CLASSNAME (CONDITIONALLY)
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}
//ERROR HANDLING HELPER
export const getErrorMessage = (error: unknown): string => {
   let message: string
   if (error instanceof Error) {
      message = error.message
   // } else if (error instanceof AxiosError) {
   //    message = error.message
   } else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message)
   } else if (typeof error === 'string') {
      message = error
   } else {
      message = 'unknown error'
   }
   return message
}

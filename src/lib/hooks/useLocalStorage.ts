import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(initialValue: T[], key: string) => {
   let initial: T[] = initialValue // Always initialize with the default value

   if (typeof window !== 'undefined') {
      const LS = localStorage.getItem(key)
      console.log(LS)
      if (
         LS !== 'null' &&
         LS !== null &&
         LS !== undefined &&
         LS !== 'undefined'
      ) {
         try {
            initial = JSON.parse(LS) as T[]
         } catch (error) {
            console.warn(
               'Failed to parse localStorage value, using initial value:',
               error,
            )
            initial = initialValue
         }
      }
   }

   const [storage, setStorage] = useState<T[]>(initial)

   const changeStorage = (newValue: T[]) => {
      setStorage(newValue)
   }

   useEffect(() => {
      typeof window !== 'undefined' &&
         localStorage.setItem(key, JSON.stringify(storage))
   }, [storage, key])

   return { storage, changeStorage }
}

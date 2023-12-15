'use client'

import { useState, useEffect, useCallback } from 'react'

const BackToTop = () => {
   const [scroll, setScroll] = useState(null)

   const handleScroll = useCallback(() => {
      setScroll(window.scrollY)
   }, [setScroll])

   useEffect(() => {
      setScroll(window.scrollY)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [handleScroll, setScroll])
   return (
      <aside
         className={`fixed bottom-4 right-4 ${
            scroll < 300 ? 'translate-y-[200px]' : 'translate-y-[0]'
         } transition-transform`}
      >
         <button
            onClick={() => {
               scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
               })
            }}
            className='btn btn-accent'
         >
            Back to top
         </button>
      </aside>
   )
}

export default BackToTop

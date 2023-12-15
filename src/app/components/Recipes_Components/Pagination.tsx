"use client"
import { FiChevronsLeft, FiChevronsRight,  FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
type TPagination = React.HTMLAttributes<HTMLDivElement> & {
   hasLess: boolean
   hasMore: boolean
   maxPages: number
}

const Pagination = ({className, hasLess, hasMore, maxPages} : TPagination) => {
   const searchParams = useSearchParams()
   const [page, setPage] = useState(+searchParams.get('page') || 1)
   const router = useRouter()
   const pathname = usePathname()
   const [mount, setMount] = useState(true)
   useEffect(() => {
   if(mount){
      setMount(false)
      return
   }
   const urlParams = new URLSearchParams(searchParams)
   urlParams.set('page', page.toString())
   router.push(pathname + "?" + urlParams)
   }, [page, searchParams, pathname, router])


  return (
    <div className={cn(className, "flex justify-center")}>
      <div className="join mx-auto">
         <button disabled={page === 1} onClick={() => setPage(1)} className="join-item btn btn-primary text-2xl"><FiChevronsLeft  /></button>
         <button disabled={!hasLess} onClick={() => setPage(prev => prev - 1)} className="join-item btn btn-secondary text-2xl"><FiChevronLeft /></button>
         <button disabled={!hasMore} onClick={() => setPage(prev => prev + 1)} className="join-item btn btn-secondary text-2xl"><FiChevronRight /></button>
         <button disabled={page === maxPages} onClick={() => setPage(maxPages)} className="join-item btn btn-primary text-2xl"><FiChevronsRight /></button>
      </div>
    </div>
  )
}

export default Pagination

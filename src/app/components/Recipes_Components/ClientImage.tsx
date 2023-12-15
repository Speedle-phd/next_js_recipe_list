'use client'

import Image from 'next/image'
import React from 'react'
import plate from '@/../public/images/plate.jpg'
import { cn } from '@/lib/utils'
type PClientImage = React.HTMLAttributes<HTMLImageElement> & {
   src: string
   alt: string
   width: number
   height: number
   pageUrl: string
}

const ClientImage = ({ src, alt, width, height, className, pageUrl }: PClientImage) => {
   const imageLoader = ({ src, width, quality }) => {
      console.log(src)
      return `${pageUrl}/${src}?w=${width}&q=${quality || 75}`
   }
   return (
      <Image
         // loader={imageLoader}
         className={cn(className, '')}
         src={src ?? plate}
         alt={alt}
         width={width}
         height={height}
      />
   )
}

export default ClientImage

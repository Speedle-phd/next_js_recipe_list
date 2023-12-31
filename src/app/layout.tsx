import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-image-crop/dist/ReactCrop.css'

import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Ono\'s Recipes.',
   description: 'Generated by create next app',
}

export default function RootLayout({
   children
}: {children: React.ReactNode}) {

   return (
      <html data-theme='mytheme' lang='en'>
         <body className={`${inter.className} bg-zinc-100 text-zinc-900 min-h-[100dvh]`}>
            <ToastContainer position='top-center' autoClose={3000} />
               {children}
         </body>
      </html>
   )
}

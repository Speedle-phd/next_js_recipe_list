import React from 'react'
import Header from '../Header'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <Header />
         <main className="py-8 px-4 my-2 mx-auto w-[clamp(20rem,70vw,70rem)] border-2">
            {children}
         </main>
      </div>
   )
}

export default RootLayout

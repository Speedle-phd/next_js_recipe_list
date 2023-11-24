import React, { ReactNode } from 'react'
import RootLayout from '../components/Layouts/RootLayout'

const RootLayoutComponent = ({ children }: { children: ReactNode }) => {
   return <RootLayout>{children}</RootLayout>
}

export default RootLayoutComponent

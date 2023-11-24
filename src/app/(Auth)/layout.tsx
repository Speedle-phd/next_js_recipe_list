import React, { ReactNode } from 'react'
import RootLayout from '../components/Layouts/LoginLayout'

const RootLayoutComponent = ({ children }: { children: ReactNode }) => {
   return <RootLayout>{children}</RootLayout>
}

export default RootLayoutComponent

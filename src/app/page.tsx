

import prisma from '@/lib/db'
import { cookies } from 'next/headers'
import LogoutButtonClient from './components/CustomComponents/LogoutButtonClient'

export default async function Home() {
   const users = await prisma.user.findMany()

   console.log(users)
   return (
      <main>
         {JSON.stringify(users)}
         
      </main>
   )
}

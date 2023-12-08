"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Cookies from "universal-cookie"

type TLogoutButtonClient = React.HTMLAttributes<HTMLButtonElement>

const LogoutButtonClient = ({className} : TLogoutButtonClient) => {
   const router = useRouter()
   const cookieStore = new Cookies()
   return (
      <button
         onClick={() => {
            cookieStore.remove('panda-recipes-auth', {path: '/'})
            toast.success('Successfully logged out')
            router.push('/login')
         }}
         className={cn(className, 'btn btn-outline outline-none hover:bg-red-400 focus-visible:bg-red-400 hover:border-red-500 focus-visible:border-red-500')}
      >
         Logout
      </button>
   )
}

export default LogoutButtonClient

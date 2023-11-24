"use client"

import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Cookies from "universal-cookie"

const LogoutButtonClient = () => {
   const router = useRouter()
   const cookieStore = new Cookies()
   return (
      <button
         onClick={() => {
            cookieStore.remove('panda-recipes-auth', {path: '/'})
            toast.success('Successfully logged out')
            router.push('/login')
         }}
         className='btn btn-outline btn-error'
      >
         Logout
      </button>
   )
}

export default LogoutButtonClient

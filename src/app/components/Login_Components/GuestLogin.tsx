'use client'

import { guestLoginAction } from '@/lib/actions'

const GuestLogin = () => {
   return (
      <form action={guestLoginAction}>
         <button type='submit' className='btn btn-secondray btn-xs'>
            Guest access
         </button>
      </form>
   )
}

export default GuestLogin

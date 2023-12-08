'use client'

import { useState } from 'react'
import ForgotPasswordModal from './ForgotPasswordModal'


const ForgotPasswordClient = () => {
   const [showModal, setShowModal] = useState(false)
   const closeModal = () => setShowModal(false)
   return (
      <>
         {showModal ? <ForgotPasswordModal closeModal={closeModal} /> : null}
         <div className="text-[0.6rem] mt-4 underline text-secondary" role='button' onClick={() => setShowModal(true)}>
            Forgot your password?
         </div>
      </>
   )
}

export default ForgotPasswordClient

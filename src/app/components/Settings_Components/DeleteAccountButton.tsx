"use client"
import React, {useState, useRef, createRef} from 'react'
import DeleteAccountModal from './DeleteAccountModal'

type PDeleteAccountButton = {
   email: string
}

const DeleteAccountButton = ({email}: PDeleteAccountButton) => {
   const [showModal, setShowModal] = useState(false)
   const modalRef = useRef<HTMLDivElement| null>(null)

   const closeModal = () => {
      setShowModal(false)
   }

   


  return (
    <div className="flex gap-8 items-center">
    <button className="btn btn-outline" onClick={() => setShowModal(true)}>Delete</button>
      <p><span className="font-bold text-red-800">Danger Zone:</span><br/>This operations will lead to the deletion of your account with all your stored data, which will be irreversible!</p>
    {showModal ? 
    <DeleteAccountModal 
    ref={modalRef}
   closeModal={closeModal}
   email={email}
     />
    : null}
    </div>
  )
}

export default DeleteAccountButton

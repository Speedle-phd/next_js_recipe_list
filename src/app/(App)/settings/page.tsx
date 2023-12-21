import DeleteAccountButton from '@/app/components/Settings_Components/DeleteAccountButton'
import PatchPasswordForm from '@/app/components/Settings_Components/PatchPasswordForm'
import { headers } from 'next/headers'
const Settings = () => {
   const userId = headers().get('x-userid')
   const userEmail = headers().get('x-email')
  return (
     <div>
         <h2 className='text-center text-xl font-mono font-bold mb-8'>
            Settings
         </h2>
         <div className='custom-underline'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
           <section>
            <fieldset className="border-2 border-secondary p-4">
               <legend className="px-2 font-semibold tracking-widest capitalize">Change your password</legend>
               <PatchPasswordForm userId={userId} />
            </fieldset>
           </section>
           <section>
              <fieldset className="border-2 border-red-700 p-4">
                 <legend className="px-2 font-semibold tracking-widest capitalize">Delete your account</legend>
                 
                     <DeleteAccountButton email={userEmail} />

                  {/* <button type='submit'>Delete your account</button> */}
                
              </fieldset>
           </section>
        </div>
     </div>
  )
}

export default Settings

'use client'

const SubmitButtonClient = ({ isSubmitting }: { isSubmitting: boolean }) => {
   return (
      <button
         disabled={isSubmitting}
         className='btn btn-accent disabled:bg-zinc-500/90 disabled:text-white disabled:cursor-wait transition-colors'
         type='submit'
      >
         {!isSubmitting ? (
            'Submit'
         ) : (
            <div className='loading loading-ring'></div>
         )}
      </button>
   )
}

export default SubmitButtonClient

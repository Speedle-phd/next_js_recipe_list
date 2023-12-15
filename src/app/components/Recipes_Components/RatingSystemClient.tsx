'use client'

import { updateRank } from '@/lib/actions'
import { getErrorMessage } from '@/lib/utils'
import { toast } from 'react-toastify'

type PRatingSystemClient = React.HTMLAttributes<HTMLDivElement> & {
   id: string
   rank: number
}

const RatingSystemClient = ({ id, rank }: PRatingSystemClient) => {
   const handleChange = async (newRank: number) => {
      console.log('before')
      try {
         const response = await updateRank(id, newRank)
         if ('success' in response) {
            toast.success('Successfully rated your dish.')
         } else {
            throw new Error(response.message)
         }
      } catch (err) {
         toast.error(getErrorMessage(err))
      }
   }

   return (
      <div className='rating rating-md rating-half mx-auto join-item'>
         <input
            onChange={async () => await handleChange(0)}
            type='radio'
            name={`rating-10-${id}`}
            className='rating-hidden'
            defaultChecked={rank === 0}
         />
         <input
            onChange={async () => await handleChange(0.5)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-1'
            defaultChecked={rank === 0.5}
         />
         <input
            onChange={async () => await handleChange(1)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-2'
            defaultChecked={rank === 1}
         />
         <input
            onChange={async () => await handleChange(1.5)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-1'
            defaultChecked={rank === 1.5}
         />
         <input
            onChange={async () => await handleChange(2)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-2'
            defaultChecked={rank === 2}
         />
         <input
            onChange={async () => await handleChange(2.5)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-1'
            defaultChecked={rank === 2.5}
         />
         <input
            onChange={async () => await handleChange(3)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-2'
            defaultChecked={rank === 3}
         />
         <input
            onChange={async () => await handleChange(3.5)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-1'
            defaultChecked={rank === 3.5}
         />
         <input
            onChange={async () => await handleChange(4)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-2'
            defaultChecked={rank === 4}
         />
         <input
            onChange={async () => await handleChange(4.5)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-1'
            defaultChecked={rank === 4.5}
         />
         <input
            onChange={async () => await handleChange(5)}
            type='radio'
            name={`rating-10-${id}`}
            className='hover:translate-y-[-2px] transition-transform bg-yellow-500 mask mask-star-2 mask-half-2'
            defaultChecked={rank === 5}
         />
      </div>
   )
}

export default RatingSystemClient

"use client"

import {useEffect} from 'react'

const error = ({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div className="flex flex-col items-center">
            <h2 className="font-semibold text-2xl mb-8">Something went wrong!</h2>
            <div className="custom-underline"></div>
      <button className="btn btn-error btn-outline"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

export default error

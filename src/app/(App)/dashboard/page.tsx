

import StatisticsGrid from '@/app/components/Dashboard_Components/StatisticsGrid'
import React from 'react'


const Dashboard = () => {
  return (
     <>
        <h2 className='text-center text-xl font-mono font-bold mb-2'>
           Welcome to your dashboard
        </h2>
        <p className="text-center mb-4 text-sm">Here are some statistics...</p>
        <div className='custom-underline'></div>
        <StatisticsGrid />
        
     </>
  )
}

export default Dashboard

"use client"
import {cn} from '@/lib/utils'
import React from 'react'

type PFrequencyPieTile = React.HTMLAttributes<HTMLDivElement> & {}


// import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList, Legend } from 'recharts'

// const data = [
//    { name: 'Group A', value: 400 },
//    { name: 'Group B', value: 300 },
//    { name: 'Group C', value: 300 },
// ]
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const FrequencyPieTile = ({className} : PFrequencyPieTile) => {
  return (
     <div className={cn(className,"glass p-4 rounded-box")}>
      <h2 className="font-semibold text-lg text-center text-black/60">Percentage per category</h2>
      <div className="divider"></div>
        <div className="flex justify-center items-center bg-zinc-100 rounded-box">
         Content
        </div>
     </div>

  )
}

export default FrequencyPieTile

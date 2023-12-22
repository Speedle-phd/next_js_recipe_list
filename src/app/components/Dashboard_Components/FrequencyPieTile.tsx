"use client"
import {cn} from '@/lib/utils'
import React from 'react'

type PFrequencyPieTile = React.HTMLAttributes<HTMLDivElement> & {
   pieData: {name: string, value: number}[]
}


import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList, Legend } from 'recharts'

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', ]
const FrequencyPieTile = ({className, pieData} : PFrequencyPieTile) => {
  return (
     <div className={cn(className,"glass p-4 rounded-box")}>
      <h2 className="font-semibold text-lg text-center text-black/60">Percentage per category</h2>
      <div className="divider"></div>
        <div className="flex justify-center items-center bg-zinc-100 rounded-box">
         <ResponsiveContainer width={"100%"} height={200} className="flex justify-center items-center">
            <PieChart height={600} width={700} className="">
               <Pie 
               data={pieData}
               startAngle={180}
               cy={"90%"}
               endAngle={0}
               innerRadius={50}
               outerRadius={110}
               fill="#8884d8"
               paddingAngle={3}
               dataKey={'value'}
               //  label
               >
                  {pieData.map((entry, index) => {
                     return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  })}
                  <LabelList className="text-[0.8rem]" />
               </Pie>
               <Legend />
            </PieChart>
               
         </ResponsiveContainer>
        </div>
     </div>

  )
}

export default FrequencyPieTile

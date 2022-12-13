import React, { useState, useEffect } from 'react'
import { IWeek } from '../../interfaces'
import { AddHours } from '../../utils'

interface Props {
  week: IWeek
}

export const Weeks: React.FC<Props> = ({ week }) => {

  const [addHours, setAddHours] = useState('')

  const hoursTasks = () => {
    let hours: any = []
    week.tasks?.map(task => {
      hours = hours.concat(task.objective)
    })
    setAddHours(hours)
  }

  useEffect(() => {
    hoursTasks()
  }, [week])

  return (
    <div className='bg-blue-500 rounded-md w-fit mb-2 flex'>
      <p className='pr-3 pl-3 mt-3 mb-3 border-r text-white font-semibold text-lg'>Semana { week.date }</p>
      <p className='pr-3 pl-3 mt-3 mb-3 text-white font-semibold text-lg'>Tiempo objetivo { addHours !== '' ? AddHours(addHours) : ''}</p>
    </div>
  )
}

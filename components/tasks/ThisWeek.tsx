import React, { useState } from 'react'
import { IWeek } from '../../interfaces'
import { Weeks } from '../../components/tasks'
import { ThisTasks } from './ThisTasks'

interface Props {
  week: IWeek
}

export const ThisWeek: React.FC<Props> = ({ week }) => {

  const [addTasks, setAddTask] = useState(false)

  return (
    <>
      <Weeks week={ week } />
      <div className='bg-gay-900 mt-4 flex mb-4'>
        <label htmlFor='toggle-switch' className=' mt-auto mb-auto mr-4 flex'>
          <input type='checkbox' onChange={e => setAddTask(e.target.checked)} id='toggle-switch' className='cursor-pointer h-7 w-12 rounded-full appearance-none bg-gray-400 mt-auto mb-auto checked:transition duration-200 relative' />
        </label>
        <p className='text-xl'>Agregar tareas</p>
      </div>
      <ThisTasks week={ week } addTasks={ addTasks } />
    </>
  )
}

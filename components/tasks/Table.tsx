import React from 'react'
import { ITask, IWeek } from '../../interfaces'
import { NewTask } from './'

interface Props {
  tasks: ITask[] | undefined
}

export const Table: React.FC<Props> = ({ tasks }) => {
  return (
    <div>
      {
        tasks?.length !== 0
          ? (
            <div className='shadow-md bg-gray-50/25 border rounded-lg w-fit dark:bg-gray-700/50 dark:border-slate-700'>
              <table className=''>
                <thead className='border-b dark:border-slate-700'>
                  <tr>
                    <th className='p-3 w-96 text-left text-lg'>Tarea</th>
                    <th className='p-3 w-40 text-left text-lg'>Objetivo</th>
                    <th className='p-3 w-40 text-left text-lg'>Completado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tasks?.map(task => {
                      return <tr key={task.task}>
                        <td className='p-3 w-600 text-lg'>{task.task}</td>
                        <td className='p-3 w-40 text-lg'>{task.objective}</td>
                        <td className='p-3 w-40 text-lg'>{ task.completed ? task.completed : <h1 className='text-lg'>0:00</h1> }</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          )
          : <p className='text-xl'>No tiene tareas agregadas</p>
      }
    </div>
  )
}

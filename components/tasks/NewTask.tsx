import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IWeek } from '../../interfaces'
import { organizateApi } from '../../api'
import { Table } from './'

interface Props {
  week: IWeek
}

export const NewTask: React.FC<Props> = ({ week }) => {

  const [tableTasks, setTableTasks] = useState(week.tasks)

  const { register, handleSubmit, resetField, formState: { errors } } = useForm({
    defaultValues: {
      task: '',
      hours: '',
      minutes: ''
    }
  })

  useEffect(() => {
    setTableTasks(week.tasks)
  }, [week])

  const onSubmit = async (data: any) => {
    const taskData = {
      week,
      data
    }
    resetField('task')
    resetField('hours')
    resetField('minutes')
    organizateApi.post('/tasks', taskData)
    const task = {
      task: data.task,
      objective: `${data.hours < 10 ? "0" + data.hours : data.hours}:${data.minutes}`
    }
    setTableTasks(tableTasks!.concat(task))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div className="mb-4">
          <h3 className='p-2 text-lg bg-indigo-500 text-white font-semibold rounded-md mb-2 w-fit'>Editando tareas de la semana {week.date}</h3>
          <p className="text-2xl font-medium mb-2">Agrega tareas objetivo a tu semana</p>
          <div className="flex gap-4">
            <div>
              <p className="text-xl mb-2">Ingresa el nombre de la tarea</p>
              <input {...register('task', { required: true })} className='p-2 rounded-md shadow w-96 dark:bg-gray-700' placeholder='Tarea' />
            </div>
            <div>
              <p className="text-xl mb-2">Ingresa el tiempo objetivo</p>
              <div className="flex gap-1">
                <input {...register('hours')} className='p-2 rounded-md shadow w-32 dark:bg-gray-700' placeholder="Hora" />
                <p className="text-xl">:</p>
                <input {...register('minutes')} className='p-2 rounded-md shadow w-32 dark:bg-gray-700' placeholder="Minutos" />
              </div>
            </div>
            <div className="flex">
              <div className="mt-auto">
                <input
                  type='submit'
                  value='Agregar tarea'
                  className='cursor-pointer bg-cyan-500 shadow-md shadow-cyan-500/50 p-2 rounded-md text-white font-semibold'
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      {
        tableTasks!.length !== 0
          ? <Table tasks={ tableTasks } />
          : ''
      }
    </>
  )
}

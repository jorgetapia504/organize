import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { organizateApi } from '../../api'
import { NewTask, Table } from './'
import { IWeek } from '../../interfaces'

export const NewWeek = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [week, setWeek] = useState<IWeek>({
    date: ''
  })

  const onSubmit = async (data: any) => {
    const date = { date: data.date }
    try {
      const newWeek = await organizateApi.post('/new-week', date)
      if ( newWeek ) {
        setWeek(newWeek.data)
      } else {
        console.log('Semana ya ingresada')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
        <div className="flex gap-4 pb-4">
          <div>
            <p className="text-xl mb-2">Inicio de semana</p>
            <input type='date' {...register('date', { required: true })} className="p-2 rounded-md shadow dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex">
          <div className="mt-auto">
            <input
              type='submit'
              value='Agregar nueva semana'
              className="cursor-pointer bg-cyan-500 shadow-md shadow-cyan-500/50 p-2 rounded-md text-white font-semibold"
            />
          </div>
        </div>
      </form>
      {
        week.date !== ''
          ? <NewTask week={ week } />
          : ''
      }
    </>
  )
}

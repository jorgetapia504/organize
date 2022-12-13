import React, { useState, useEffect } from 'react'
import { Base, Spinner } from '../../components/ui'
import { organizateApi } from '../../api'
import { IWeek } from '../../interfaces'
import { NewTask, Table, Weeks } from '../../components/tasks'
import Link from 'next/link'

const Week = () => {

  const [weeks, setWeeks] = useState([])
  const [week, setWeek] = useState<IWeek>({
    date: ''
  })
  const [loading, setLoading] = useState(true)

  const getWeeks = async () => {
    setLoading(true)
    const weeksData = await organizateApi.get('/weeks')
    setWeeks(weeksData.data)
    setLoading(false)
  }

  useEffect(() => {
    getWeeks()
  }, [])

  return (
    <Base>
      <h1 className='text-4xl mb-4 font-semibold'>Semanas</h1>
      {
        loading === true
          ? (
            <div className='flex h-56'>
              <div className='m-auto'>
                <Spinner />
              </div>
            </div>
          )
          : weeks.length !== 0
            ? <div className='mb-4'>
              {
                weeks.map((week: IWeek) => (
                  <div key={week._id?.toString()}>
                    <button onClick={() => {
                      const selectedWeek = weeks.find((weekSelected: IWeek) => weekSelected._id === week._id)
                      setWeek(selectedWeek!)
                    }}>
                      <Weeks week={week} />
                    </button>
                  </div>
                ))
              }
            </div>
            : (
            <>
              <p className='text-xl mb-6'>No hay semanas ingresadas</p>
              <Link className="text-white font-semibold p-2 rounded-md bg-cyan-500 shadow-md shadow-cyan-500/50" href='/nueva-semana'>Nueva Semana</Link>
            </>
            )
      }
      {
        week.tasks
          ? <>
            <NewTask week={ week } />
          </>
          : ''
      }
    </Base>
  )
}

export default Week
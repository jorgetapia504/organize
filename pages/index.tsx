import { useEffect, useState } from "react"
import { organizateApi } from "../api"
import { ThisWeek } from "../components/tasks"
import { Base, Spinner } from "../components/ui"
import { IWeek } from "../interfaces"

export default function Home() {

  const [week, setWeek] = useState<IWeek>({
    date: ''
  })
  const [loading, setLoading] = useState(true)

  const getWeek = async () => {
    setLoading(true)
    const thisWeek = await organizateApi.get('/this-week')
    setWeek(thisWeek.data)
    setLoading(false)
  }

  useEffect(() => {
    getWeek()
  }, [])

  return (
    <Base>
      <h1 className="text-4xl font-bold mb-8">Organiza tus tiempos de la mejor forma</h1>
      <h3 className="text-3xl font-semibold mb-5">Semana actual</h3>
      {
        loading
          ? (
            <div className='flex h-56'>
              <div className='m-auto'>
                <Spinner />
              </div>
            </div>
          )
          : week._id
            ? <ThisWeek week={week} />
            : <>
              <p className="text-xl mb-6">No se ha creado la semana actual</p>
              <button onClick={async () => {
                const today = new Date()
                const first = today.getDate() - today.getDay() + 1
                const monday = new Date(today.setDate(first))
              
                const day = monday.getDate()
                const month = monday.getMonth() + 1
                const year = monday.getFullYear()
                const dateFormat = `${day > 9 ? day : `0${day}`}-${month}-${year}`
                const data = {
                  date: dateFormat
                }
                await organizateApi.post('/new-week', data)
                getWeek()
              }} className="text-white font-semibold p-2 rounded-md bg-cyan-500 shadow-md shadow-cyan-500/50">Crear semana actual</button>
            </>
      }
    </Base>
  )
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../database/db'
import { IWeek } from '../../../interfaces'
import { Week } from '../../../models'

type Data = 
  | { message: string }
  | IWeek

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'POST':
      return createWeek( req, res )
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function createWeek(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { date = '' } = req.body

  if ( date === '' ) {
    return res.status(400).json({
      message: 'Debe tener una fecha de inicio de semana'
    })
  }

  let dateFormat = ''

  if ( date.slice(6, -2) === '20' ) {
    dateFormat = date
  } else {
    const day = date.slice(-2)
    const month = date.slice(5, -3)
    const year = date.slice(0, 4)
    dateFormat = `${day}-${month}-${year}`
  }

  await dbConnect()
  const weeks = await Week.find()

  if ( weeks ) {
    const week = weeks.find(week => week.date === dateFormat)
    if ( week !== undefined ) {
      return res.status(400).json({
        message: 'Esta semana ya esta ingresada'
      })
    }
  }

  const newWeek = new Week({ date: dateFormat })

  try {
    const weekSave = await newWeek.save()
    return res.status(200).json(weekSave)
  } catch (error) {
    console.log(error)
  }
}


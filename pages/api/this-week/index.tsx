import type { NextApiRequest, NextApiResponse } from 'next'
import { IWeek } from '../../../interfaces'
import { dbConnect } from '../../../database/db'
import { Week } from '../../../models'

type Data = 
  | { message: string }
  | IWeek

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'GET':
      return getThisWeek( req, res )
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getThisWeek(req: NextApiRequest, res: NextApiResponse<Data>) {
  const today = new Date()
  const first = today.getDate() - today.getDay() + 1
  const monday = new Date(today.setDate(first))

  const day = monday.getDate()
  const month = monday.getMonth() + 1
  const year = monday.getFullYear()
  const dateFormated = `${day > 9 ? day : `0${day}`}-${month}-${year}`

  await dbConnect()
  const thisWeek = await Week.findOne({ date: dateFormated })

  if ( thisWeek === null ) {
    return res.status(204).json({ message: 'Not created this week' })
  }
  
  return res.status(200).json(thisWeek)
}

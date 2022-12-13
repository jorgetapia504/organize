import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../database/db'
import { IWeek } from '../../../interfaces'
import { Week } from '../../../models'

type Data = 
  | { message: string }
  | IWeek[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'GET':
      return getWeeks( req, res )
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getWeeks(req: NextApiRequest, res: NextApiResponse<Data>) {
  await dbConnect()
  const weeks = await Week.find()
  return res.status(200).json(weeks)
}
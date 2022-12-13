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
      return updateTask( req, res )
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function updateTask(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body

  if ( data === '' ) {
    return res.status(400).json({
      message: 'No se ha ingresado una tarea'
    })
  }

  await dbConnect()
  const task = await Week.findById(data.week._id)

  if ( task?.tasks?.length === 0 ) {
    await Week.findByIdAndUpdate(task._id, { tasks: [{ task: data.data.task, objective: `${data.data.hours < 10 ? "0" + data.data.hours : data.data.hours}:${data.data.minutes}`}] })
  } else {
    const concatTasks = task?.tasks?.concat({ task: data.data.task, objective: `${data.data.hours < 10 ? "0" + data.data.hours : data.data.hours}:${data.data.minutes}`})
    await Week.findByIdAndUpdate(task?._id, { tasks: concatTasks })
  }
}

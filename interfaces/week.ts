import { ITask } from './'
import { Types } from 'mongoose'

export interface IWeek {
  _id?: Types.ObjectId
  date: string
  tasks?: ITask[]

  createdAt?: string;
  updatedAt?: string;
}
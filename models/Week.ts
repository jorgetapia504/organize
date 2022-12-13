import mongoose, { Schema, model, Model } from 'mongoose'
import { IWeek } from '../interfaces'

const weekSchema = new Schema({
  date: { type: String, required: true },
  tasks: [{
    task: { type: String },
    objective: { type: String },
    completed: { type: String }
  }]
}, {
  timestamps: true
})

const Week: Model<IWeek> = mongoose.models.Week || model('Week', weekSchema)

export default Week
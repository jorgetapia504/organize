import React from 'react'
import { Base } from '../../components/ui'
import { NewWeek } from '../../components/tasks'

const AddWeek = () => {
  return (
    <Base>
      <h1 className="text-4xl mb-4 font-semibold">Nueva semana</h1>
      <NewWeek />
    </Base>
  )
}

export default AddWeek
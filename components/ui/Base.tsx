import React from 'react'
import { PropsWithChildren } from 'react'

export const Base: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex dark:bg-gray-800">
      <div className="w-1440 m-auto px-4 py-8">
        { children }
      </div>
    </div>
  )
}

import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

export const Navbar = () => {
  
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme

    if ( currentTheme === 'dark' ) {
      return (
        <button onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600 ml-2' /></button>
      )
    } else {
      return (
        <button onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500 ml-2' /></button>
      )
    }
  }

  return (
    <div className="border-b flex dark:bg-gray-800 dark:border-slate-700">
      <div className="m-auto w-1440 flex justify-between p-4">
        <Link className='mt-auto mb-auto' href='/'><h2 className='font-bold text-xl'>ORGANIZE</h2></Link>
        <div className='flex gap-4'>
          <Link className='mt-auto mb-auto' href='/'>Inicio</Link>
          <Link className='mt-auto mb-auto' href='/semanas'>Semanas</Link>
          <Link className='text-white font-semibold p-2 rounded-md bg-cyan-500 ml-2' href='/nueva-semana'>Nueva semana</Link>
          {renderThemeChanger()}
        </div>
      </div>
    </div>
  )
}

import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { Navbar } from '../ui'

interface Props {
  title: string
  description: string
  image?: string
}

export const MainLayout: React.FC<PropsWithChildren<Props>> = ({ children, title, description, image }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={ description } />
        <meta name='og:title' content={ title } />
        <meta name='og:description' content={ description } />
        {
          image && (
            <meta name='og:image' content={ image } />
          )
        }
      </Head>
      <Navbar />
      { children }
    </>
  )
}

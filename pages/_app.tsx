import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { MainLayout } from '../components/layouts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <MainLayout title="Organize App" description="App para ayudarte con tu organización.">
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  )
}

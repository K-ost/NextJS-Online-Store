import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
import Loader from '../components/Loader'

function MyApp({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    const start = () => setLoad(true)
    const end = () => setLoad(false)
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return (
    <Provider store={store}>
      <Loader load={load} />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

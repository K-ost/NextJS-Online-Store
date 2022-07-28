import Head from "next/head"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadOrders, updateCompare } from "../store/slice"
import { AppDispatch, RootState } from "../store/store"
import NavBar from "./NavBar"
import Notice from "./Notice"

interface ILayout {
  children: any
  title: string
  keywords: string
}

export const Layout: React.FC<ILayout> = ({ children, keywords, title }) => {
  const dispatch = useDispatch<AppDispatch>()
  const notice = useSelector((state: RootState) => state.app.notice)

  useEffect(() => {
    const storageOrders = localStorage.getItem('orders')
    if (storageOrders) {
      dispatch(loadOrders(JSON.parse(storageOrders)))
    }
  }, [dispatch])

  useEffect(() => {
    const storageCompare = localStorage.getItem('compare')
    if (storageCompare) {
      dispatch(updateCompare(JSON.parse(storageCompare)))
    }
  }, [dispatch])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
      </Head>
      <NavBar />
      <div className="container">
        {children}
      </div>
      {notice &&
        <Notice message={notice} show={notice !== null} />
      }
    </div>
  )
}
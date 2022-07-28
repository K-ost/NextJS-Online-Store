import { NextPage } from "next"
import Link from "next/link"
import { useSelector } from "react-redux"
import { Layout } from "../components/Layout"
import Order from "../components/Order"
import { RootState } from "../store/store"
import empty from "../assets/cart.svg"

const Basket: NextPage = () => {
  const orders = useSelector((state: RootState) => state.app.orders)

  const totalPrice = (orders.reduce((prev, el) => prev + el.total, 0)).toLocaleString()
  
  return (
    <Layout title="Your basket" keywords="basket, online store">
      <h1>Basket</h1>
      {orders.map(el => <Order key={el.id} order={el} />)}
      {!orders.length ?
        <div className="emptycart">
          <img src={empty.src} alt="" />
          <h4 className="mb-3">Your cart is empty</h4>
          <Link href="/products"><a className="btn btn-sm btn-outline-primary">Go back to catalog</a></Link>
        </div> :
        <h3>Total price: <b>{totalPrice}</b> <small>uah</small></h3>
      }
    </Layout>
  )
}

export default Basket
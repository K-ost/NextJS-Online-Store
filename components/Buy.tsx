import { useDispatch } from "react-redux"
import { addOrder, setNotice } from "../store/slice"
import { AppDispatch } from "../store/store"
import { IProduct } from "../types/types"

interface IBuy {
  product: IProduct
  small?: boolean
}

const Buy: React.FC<IBuy> = ({ product, small }) => {
  const dispatch = useDispatch<AppDispatch>()
  const buyClass = small ? 'btn btn-outline-primary btn-sm' : 'btn btn-primary'
  const buyDisableClass = small ? 'btn btn-outline-secondary btn-sm' : 'btn btn-outline-secondary'

  // handler
  const handler = () => {
    const newOrder = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      img: product.img
    }
    dispatch(addOrder(newOrder))
    dispatch(setNotice('Product has already added to cart'))
  }
  
  return (
    <>
      {product.stock
        ? <button className={buyClass} onClick={handler}>Add to cart</button>
        : <button className={buyDisableClass} disabled>Not available</button>
      }
    </>
  )
}

export default Buy
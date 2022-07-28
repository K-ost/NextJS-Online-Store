import Link from "next/link"
import { IProduct } from "../types/types"
import Buy from "./Buy"
import Compare from "./Compare"

interface IProductC {
  product: IProduct
}

const Product: React.FC<IProductC> = ({ product }) => {
  const productClass = product.stock ? 'product product-instock' : 'product'
  const price = `${product.price.toLocaleString()}`

  return (
    <div className={`col-12 col-md-6 col-lg-4 ${productClass}`}>
      <div className="product-inner">
        <div className={product.img ? 'product-img' : 'product-img nofoto'}>
          {product.img ? 
            <Link href={`/products/[id]`} as={`/products/${product.id}`}>
              <a><img src={product.img} alt="" /></a>
            </Link> :
            <span>no photo</span>
          }
        </div>
        <div className="product-content">
          <div className="product-name">
            <Link href={`/products/[id]`} as={`/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </div>
          <div className="product-options">
            <div className="brandchip">{product.brand}</div>
            <div className="product-price">{price} <small>UAH</small></div>
            <div className="product-stock">{product.stock ? 'in stock' : 'out of stock'}</div>
            <div className="d-flex align-items-center justify-content-between">
              <Buy product={product} small={true} />
              <Compare product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
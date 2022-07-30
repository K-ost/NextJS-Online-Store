import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

const NavBar: React.FC = () => {
  const { pathname } = useRouter()
  const orders = useSelector((state: RootState) => state.app.orders)
  const compare = useSelector((state: RootState) => state.app.compare)
  const ordersCount = orders.reduce((prev, el) => prev + el.count, 0)

  return (
    <div className="navbar">
      <div className="container">
        <ul>
          <li className={(pathname === '/') ? 'active' : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={(pathname === '/products') ? 'active' : ''}>
            <Link href="/products">Products</Link>
          </li>
          <li className={(pathname === '/about') ? 'active' : ''}>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <div>
          {!compare.length
            ? <button className="btn btn-outline-light headbtn-compare" disabled></button>
            : <Link href={"/compare"}>
              <a className="btn btn-outline-light headbtn-compare position-relative">
                {compare.length > 0 &&
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{compare.length}</span>
                }
              </a>
            </Link>
          }

          {!orders.length
            ? <button className="btn btn-outline-light headbtn-cart" disabled></button>
            : <Link href="/basket">
              <a className="btn btn-outline-light position-relative headbtn-cart">
                {ordersCount > 0 &&
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{ordersCount}</span>
                }
              </a>
            </Link>
          }

        </div>
      </div>
    </div>
  )
}

export default NavBar
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Filter from "../components/Filter/Filter"
import { Layout } from "../components/Layout"
import Pager from "../components/Pager"
import Product from "../components/Product"
import Skelets from "../components/Skelets"
import Sort from "../components/Sort"
import { fetchProducts, leavePage } from "../store/slice"
import { AppDispatch, RootState } from "../store/store"

const pageCount = '6'

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.app.products)
  const loading = useSelector((state: RootState) => state.app.loading)
  const length = useSelector((state: RootState) => state.app.totalCount)
  const sort = useSelector((state: RootState) => state.app.sort)
  const page = useSelector((state: RootState) => state.app.page)
  const filter = useSelector((state: RootState) => state.app.filter)
  const totalCount = useSelector((state: RootState) => state.app.totalCount)

  useEffect(() => {
    if (loading === 'pending') {
      dispatch(fetchProducts({count: pageCount, page, sort, filter}))
    }
  }, [loading, dispatch, page, sort, filter])

  useEffect(() => {
    return () => {
      dispatch(leavePage())
    }
  }, [dispatch])

  return (
    <Layout title="Catalog" keywords="products">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1 className="mg-0">Products</h1>
        <Sort />
      </div>
      <div className="row">
        <div className="col-12 col-lg-3">
          <Filter />
        </div>
        <div className="col-12 col-lg-9">
          <div className="row">
            {products.map(el => <Product key={el.id} product={el} />)}
            {totalCount === 0 && <h5>Products not found</h5>}
            {loading === 'pending' && !products.length && <Skelets count={pageCount} />}
          </div>
          <Pager length={length} count={pageCount} />
        </div>
      </div>
    </Layout>
  )
}

export default Products
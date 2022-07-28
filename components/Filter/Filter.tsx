import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFetch, setPreload, resetFilter, setPage, fetchBrands } from "../../store/slice"
import { AppDispatch, RootState } from "../../store/store"
import FilterItem from "./FilterItem"

const Filter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector((state: RootState) => state.app.filter)
  const brands = useSelector((state: RootState) => state.app.brands)
  const [showFilter, setShowFilter] = useState<boolean>()

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  // filterHandler
  const filterHandler = () => {
    dispatch(setFetch())
    dispatch(setPreload(true))
    dispatch(setPage('1'))
  }
  
  // resetHandler
  const resetHandler = () => {
    dispatch(resetFilter())
    dispatch(setFetch())
    dispatch(setPreload(true))
    dispatch(setPage('1'))
  }

  return (
    <div className="filter">
      <button className="btn btn-outline-primary filter-show" onClick={() => setShowFilter(!showFilter)}>Show filter</button>
      
      <div className={`filter-inner ${showFilter ? "opened" : ""}`}>
        <h3 className="mb-4">Filter</h3>

        <div className="mb-4">
          <h5>By brand</h5>
          {brands.map(el => <FilterItem key={el.id} value={el.title} name="brand" id={el.title} />)}
          {!brands.length && 
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        </div>

        <div className="mb-4">
          <h5>By stock</h5>
          <FilterItem value="In stock" name="stock" id="true" />
          <FilterItem value="Out of stock" name="stock" id="false" />
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <button className="btn btn-sm btn-primary filter-choose" onClick={filterHandler}>Filter</button>
          </div>
          <div className="col-12 col-md-6">
            <button className="btn btn-sm btn-outline-secondary" onClick={resetHandler} disabled={!filter.length}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
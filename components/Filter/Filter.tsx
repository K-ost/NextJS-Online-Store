import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFetch, setPreload, resetFilter, setPage, fetchBrands, fetchFeatures } from "../../store/slice"
import { AppDispatch, RootState } from "../../store/store"
import FilterItem from "./FilterItem"
import styles from '../../styles/Filter.module.scss'

const Filter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector((state: RootState) => state.app.filter)
  const brands = useSelector((state: RootState) => state.app.brands)
  const features = useSelector((state: RootState) => state.app.features)
  const [showFilter, setShowFilter] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchBrands())
    dispatch(fetchFeatures())
  }, [dispatch])

  // filterHandler
  const filterHandler = () => {
    dispatch(setFetch())
    dispatch(setPreload(true))
    dispatch(setPage('1'))
    setShowFilter(false)
  }
  
  // resetHandler
  const resetHandler = () => {
    dispatch(resetFilter())
    dispatch(setFetch())
    dispatch(setPreload(true))
    dispatch(setPage('1'))
    setShowFilter(false)
  }

  return (
    <div className={styles.filter}>
      <button className={styles.filterShow} onClick={() => setShowFilter(!showFilter)}></button>
      
      <div className={showFilter ? `${styles.filterInner} ${styles['opened']}` : styles.filterInner}>
        <h3 className={styles.filterMainHead}>Filter</h3>
        
        <div className={styles.filterContent}>
          <div className="mb-4">
            <h5 className={styles.filterHeader}>By brand</h5>
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
            <h5 className={styles.filterHeader}>By CPU</h5>
            {features?.cpu.map(el => <FilterItem key={el} value={el} name="cpu" id={el} />)}
            {!features?.cpu.length && 
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
          </div>

          <div className="mb-4">
            <h5 className={styles.filterHeader}>By stock</h5>
            <FilterItem value="In stock" name="stock" id="true" />
            <FilterItem value="Out of stock" name="stock" id="false" />
          </div>
        </div>

        <div className={styles.filterFooter}>
          <div className="row">
            <div className="col-6">
              <button className="btn btn-sm btn-primary btn-block" onClick={filterHandler}>Filter</button>
            </div>
            <div className="col-6">
              <button className="btn btn-sm btn-outline-secondary btn-block" onClick={resetHandler} disabled={!filter.length}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
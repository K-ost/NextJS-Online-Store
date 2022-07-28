import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../components/Layout'
import { AppDispatch, RootState } from '../store/store'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from '../styles/Compare.module.scss'
import CompareItem from '../components/CompareItem'
import { clearAllCompare } from '../store/slice'
import Link from 'next/link'

const Compare: NextPage = () => {
  const compare = useSelector((state: RootState) => state.app.compare)
  const dispatch = useDispatch<AppDispatch>()

  // clearHandler
  const clearHandler = () => {
    dispatch(clearAllCompare())
  }

  return (
    <Layout title="Compare" keywords="compare">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1>Compare</h1>
        {compare.length > 0 && <button className="btn btn-outline-secondary btn-sm" onClick={clearHandler}>Clear all list</button>}
      </div>

      {compare.length ?
      <div className={styles.compareTable}>
        <div className={styles.compareTableLeft}>
          <div className={styles.compareTableLeftImg}></div>
          <div className={styles.compareTableLeftName}></div>
          <div className={styles.compareTableLeftPrice}></div>
          <ul className={styles.compareTableLeftFeats}>
            <li>Available:</li>
            <li>Count:</li>
            <li>Weight:</li>
          </ul>
        </div>
        <div className={styles.compareTableRight}>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              460: {
                slidesPerView: 2,
              },
              720: {
                slidesPerView: 3,
              },
            }}
          >
            {compare.map(el => (
              <SwiperSlide key={el.id}>
                <CompareItem el={el} />
              </SwiperSlide>  
            ))}
          </Swiper>
        </div>
      </div> :

      <div className="emptycart">
        <h2 className="mb-3">Compare list is empty</h2>
        <Link href="/products"><a className="btn btn-sm btn-outline-primary">Go back to catalog</a></Link>
      </div>
      }
      
    </Layout>
  )
}

export default Compare
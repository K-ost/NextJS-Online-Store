import { useDispatch } from 'react-redux'
import { removeCompareItem } from '../store/slice'
import { AppDispatch } from '../store/store'
import styles from '../styles/Compare.module.scss'
import { IProduct } from '../types/types'

interface ICompareItem {
  el: IProduct
}

const CompareItem: React.FC<ICompareItem> = ({ el }) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className={styles.compare}>
      <div className={styles.compareRemove}>
        <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeCompareItem(el.id))}>&times;</button>
      </div>
      <div className={styles.compareImg}>
        <img src={el.img} alt="" />
      </div>
      <h5>{el.name}</h5>
      <div className={styles.comparePrice}>{el.price.toLocaleString()} <small>UAH</small></div>
      <ul className={styles.compareFeats}>
        <li>{el.stock ? "In stock" : "Out of stock"}</li>
        <li>{el.cpu}</li>
        <li>{el.memory}</li>
        <li>{el.HDD}</li>
        <li>{el.quantity}</li>
        <li>{el.weight}</li>
      </ul>
    </div>
  )
}

export default CompareItem
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { setCompare } from "../store/slice"
import { IProduct } from "../types/types"

interface ICompareBtn {
  product: IProduct
  large?: boolean
}

const Compare: React.FC<ICompareBtn> = ({ large, product }) => {
  const dispatch = useDispatch<AppDispatch>()
  const compareList = useSelector((state: RootState) => state.app.compare)
  const active = compareList.some(el => el.id.toString() === product.id.toString())
  const classCompare = `btn ${large ? "" : "btn-sm"} btn-outline-secondary btn-compare ${active ? "active" : ""}`

  return (
    <button className={classCompare} onClick={() => dispatch(setCompare(product))}>
      <span></span>
    </button>
  )
}

export default Compare
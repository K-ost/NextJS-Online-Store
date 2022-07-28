import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface ILoader {
  load: boolean
}

const Loader: React.FC<ILoader> = ({ load }) => {
  const preload = useSelector((state: RootState) => state.app.preload)
  const loaderClass = (preload || load) ? 'loaderbox show' : 'loaderbox'

  return (
    <div className={loaderClass}>
      <span className="loader"></span>
    </div>
  )
}

export default Loader
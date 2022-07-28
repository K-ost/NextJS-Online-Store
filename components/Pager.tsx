import { useDispatch, useSelector } from "react-redux"
import { setFetch, setPage, setPreload } from "../store/slice"
import { AppDispatch, RootState } from "../store/store"

interface IPager {
  count: string
  length: number
}

const Pager: React.FC<IPager> = ({ count, length }) => {
  const activePage = useSelector((state: RootState) => state.app.page)
  const dispatch = useDispatch<AppDispatch>()

  if (length <= 6) {
    return null
  }

  // Create array
  const pages = Math.ceil(length / Number(count))
  const pagesArr = []
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i.toString())
  }

  const firstClass = (activePage === '1') ? 'page-item disabled' : 'page-item'
  const lastClass = (activePage === pagesArr.length.toString()) ? 'page-item disabled' : 'page-item'

  // pagerHandler
  const pagerHandler = (page: string) => {
    dispatch(setPage(page))
    dispatch(setFetch())
    dispatch(setPreload(true))
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={firstClass}>
          <button className="page-link" onClick={() => pagerHandler('1')} disabled={activePage === '1'}>First</button>
        </li>

        {pagesArr.map(el => (
          <li key={el} className={el === activePage ? "page-item active" : "page-item"}>
            <button
              className="page-link"
              onClick={() => pagerHandler(el)}
              disabled={el === activePage}
            >{el}</button>
          </li>  
        ))}

        <li className={lastClass}>
          <button className="page-link" onClick={() => pagerHandler(pagesArr.length.toString())} disabled={activePage === pagesArr.length.toString()}>Last</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pager
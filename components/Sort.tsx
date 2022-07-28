import { useState } from "react"
import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setFetch, setPage, setSort, setPreload } from "../store/slice"
import { AppDispatch, RootState } from "../store/store"

const Sort: React.FC = () => {
  const totalCount = useSelector((state: RootState) => state.app.totalCount)
  const [value, setValue] = useState<string>('Sort by')
  const dispatch = useDispatch<AppDispatch>()

  // handler
  const handler = (field: string | null, by: string | null, value: string) => {
    setValue(value)
    if (field && by) {
      dispatch(setSort(`&_sort=${field}&_order=${by}`))
    } else {
      dispatch(setSort(''))
    }
    dispatch(setPage('1'))
    dispatch(setFetch())
    dispatch(setPreload(true))
  }

  if (totalCount <= 1) {
    return null
  }

  return (
    <Dropdown className="mb-0" align="end">
      <Dropdown.Toggle size="sm" variant="outline-primary" id="dropdown-basic">
        {value}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handler(null, null, 'Sort by')}>Default</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handler('price', 'asc', 'Cheap to expensive')}>Cheap to expensive</Dropdown.Item>
        <Dropdown.Item onClick={() => handler('price', 'desc', 'Expensive to cheap')}>Expensive to cheap</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Sort
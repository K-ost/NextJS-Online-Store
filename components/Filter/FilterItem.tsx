import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../store/slice'
import { AppDispatch, RootState } from '../../store/store'

interface IFilterItem {
  id: string
  name: string
  value: string
}

const FilterItem: React.FC<IFilterItem> = ({ id, name, value }) => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector((state: RootState) => state.app.filter)

  useEffect(() => {
    if (!filter.length) {
      ref.current!.checked = false
    }
  }, [filter])

  // handler
  const handler = (): void => {
    const newCheck = { id, name }
    dispatch(setFilter(newCheck))
  }

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" name={name} id={id} ref={ref} onClick={handler} />
      <label className="form-check-label" htmlFor={id}>
        {value}
      </label>
    </div>
  )
}

export default FilterItem
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { server } from '../helpers'
import { IBrand, IOrder, IProduct, objFetch } from '../types/types'

// Fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (obj: objFetch) => {
    const { count, page, sort, filter } = obj
    const response = await fetch(`${server}/products?_limit=${count}&_page=${page}${sort}${filter}`)
    const data = await response.json()
    const total = response.headers.get('X-Total-Count')
    return { data, total }
  }
)

// Fetching brands
export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    const response = await fetch(`${server}/brands`)
    const brands = await response.json()
    return brands
  }
)

export interface sliceState {
  products: IProduct[]
  loading: 'pending' | 'succeeded' | 'failed'
  totalCount: number
  preload: boolean
  sort: string
  page: string
  filter: string
  filterOpt: string[]
  brands: IBrand[]
  orders: IOrder[]
  notice: string | null
  compare: IProduct[]
}

const initialState: sliceState = {
  products: [],
  loading: 'pending',
  totalCount: 0,
  preload: false,
  sort: '',
  page: '1',
  filter: '',
  filterOpt: [],
  brands: [],
  orders: [],
  notice: null,
  compare: []
}

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPreload: (state, action) => {
      state.preload = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setFetch: (state) => {
      state.loading = 'pending'
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    leavePage: (state) => {
      state.products = []
      state.totalCount = 0
      state.page = '1'
      state.filter = ''
      state.filterOpt = []
      state.loading = 'pending'
      state.brands = []
    },

    // Filter reducer
    setFilter: (state, action) => {
      const { id, name } = action.payload
      const str = `&${name}=${id}`
      if ( !state.filterOpt.includes(str) ) {
        state.filterOpt.push(str)
      } else {
        state.filterOpt = state.filterOpt.filter(el => el !== str)
      }
      state.filterOpt.sort()
      state.filter = state.filterOpt.join('')
    },
    resetFilter: (state) => {
      state.filter = ''
      state.filterOpt = []
    },

    // ORDERS
    // Add order
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        count: 1,
        total: action.payload.price
      }
      let exist = state.orders.some(el => el.id === action.payload.id)
      if (exist) {
        state.orders = state.orders.map(el => {
          if (el.id === action.payload.id) {
            el.count += 1
            el.total = Number(el.price) * el.count
          }
          return el
        })
      } else {
        state.orders.push(newOrder)
      }
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    // changeOrder
    changeOrder: (state, action) => {
      const { id, val } = action.payload
      state.orders = state.orders.map(el => {
        if (el.id === id) {
          el.count = Number(val)
          el.total = Number(val) * Number(el.price)
        }
        return el
      })
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    // loadOrders
    loadOrders: (state, action) => {
      state.orders = action.payload
    },

    // removeOrder
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(el => el.id !== action.payload)
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    // Notice
    setNotice: (state, action) => {
      state.notice = action.payload
    },

    // COMPARE
    setCompare: (state, action) => {
      let exist = state.compare.some(el => el.id === action.payload.id)
      if ( !exist ) {
        state.compare.push(action.payload)
      } else {
        state.compare = state.compare.filter(el => el.id !== action.payload.id)
      }
      localStorage.setItem('compare', JSON.stringify(state.compare))
    },
    updateCompare: (state, action) => {
      state.compare = action.payload
    },
    removeCompareItem: (state, action) => {
      state.compare = state.compare.filter(el => el.id !== action.payload)
      localStorage.setItem('compare', JSON.stringify(state.compare))
    },
    clearAllCompare: (state) => {
      state.compare = []
      localStorage.removeItem('compare')
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data
      state.totalCount = Number(action.payload.total)
      state.loading = 'succeeded'
      state.preload = false
    })
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const {
  setPreload, setSort, setFetch, setPage, leavePage, setFilter, resetFilter, addOrder,
  loadOrders, changeOrder, removeOrder, setNotice, setCompare, updateCompare, removeCompareItem,
  clearAllCompare
} = slice.actions
export default slice.reducer
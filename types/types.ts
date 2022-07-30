export interface IProduct {
  id: number
  name: string
  brand: string
  img: string
  weight: number
  quantity: number
  price: number
  stock: boolean
  text?: any
  count?: number
}

export interface objFetchSort {
  field: string
  by: string
}

export interface objFetch {
  count: string
  page: string
  sort?: any
  filter: string
}

export interface IBrand {
  id: number
  title: string
  img?: string
  text?: string
}

export interface IComment {
  id: number
  postId: number
  name: string
  email: string
  body: string
  date: number
}

export interface IOrder {
  id: number
  name: string
  price: string
  img: string
  brand: string
  count: number
  total: number
}

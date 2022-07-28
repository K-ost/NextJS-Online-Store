import { configureStore } from '@reduxjs/toolkit'
import slice from './slice'

export const store = configureStore({
  reducer: {
    app: slice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
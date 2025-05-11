import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import transactionsReducer from './features/transactions/transactionsSlice'
import categoriesReducer from './features/categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer
  }
})
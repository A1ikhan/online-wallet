import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTransactions, addTransaction as addTransactionAPI, deleteTransaction as deleteTransactionAPI } from '../../api'

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (userId, { rejectWithValue }) => {
    try {
      return await getTransactions(userId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      return await addTransactionAPI(transaction)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeTransaction = createAsyncThunk(
  'transactions/removeTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTransactionAPI(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  }
})

export default transactionsSlice.reducer
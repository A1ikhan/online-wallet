import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCategories, addCategory as addCategoryAPI, deleteCategory as deleteCategoryAPI } from '../../api'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (userId, { rejectWithValue }) => {
    try {
      return await getCategories(userId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category, { rejectWithValue }) => {
    try {
      return await addCategoryAPI(category)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategoryAPI(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  }
})

export default categoriesSlice.reducer

import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000', // json-server endpoint
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const registerUser = async (userData) => {
  try {
    // Check if email already exists
    const { data } = await API.get('/users?email=' + userData.email)
    if (data.length > 0) {
      throw new Error('Email already exists')
    }
    
    const response = await API.post('/users', userData)
    return response.data;
    // return { user: response.data, token: 'mock-token' }
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const loginUser = async (credentials) => {
  try {
    const { data } = await API.get(`/users?email=${credentials.email}&password=${credentials.password}`)
    if (data.length === 0) {
      throw new Error('Invalid credentials')
    }
    const user = data[0]
    return { user, token: 'mock-token' }
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Transactions API
export const getTransactions = async (userId) => {
  try {
    const response = await API.get(`/transactions?userId=${userId}&_sort=date&_order=desc`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const addTransaction = async (transaction) => {
  try {
    const response = await API.post('/transactions', {
      ...transaction,
      userId: 1 // Mock user ID - replace with actual user ID from auth
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const deleteTransaction = async (id) => {
  try {
    await API.delete(`/transactions/${id}`)
  } catch (error) {
    throw error.response?.data || error.message
  }
}

// Categories API
export const getCategories = async (userId) => {
  try {
    const response = await API.get(`/categories?userId=${userId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const addCategory = async (category) => {
  try {
    const response = await API.post('/categories', {
      ...category,
      userId: 1 // Mock user ID
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const deleteCategory = async (id) => {
  try {
    await API.delete(`/categories/${id}`)
  } catch (error) {
    throw error.response?.data || error.message
  }
}
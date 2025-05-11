// Auth types
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface User {
  id: string
  email: string
  // Add other user properties as needed
}

// Transaction types
export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  date: string
  comment?: string
}

export interface TransactionsState {
  items: Transaction[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Category types
export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color?: string
  icon?: string
}

export interface CategoriesState {
  items: Category[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Root state
export interface RootState {
  auth: AuthState
  transactions: TransactionsState
  categories: CategoriesState
}
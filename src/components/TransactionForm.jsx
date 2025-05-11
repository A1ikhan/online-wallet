import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createTransaction } from '../features/transactions/transactionsSlice'
import { fetchCategories } from '../features/categories/categoriesSlice'
import { format } from 'date-fns'
import styles from '../styles/components/TransactionForm.module.css'

export default function TransactionForm({ onSuccess }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [comment, setComment] = useState('')
  
  const dispatch = useAppDispatch()
  const { items: categories } = useAppSelector(state => state.categories)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCategories(user.id))
    }
  }, [dispatch, user?.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createTransaction({
        type,
        amount: parseFloat(amount),
        category: categoryId,
        date,
        comment
      })).unwrap()
      
      // Reset form and call success callback
      setAmount('')
      setComment('')
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Failed to save transaction:', error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Type</label>
        <select 
          className={styles.select}
          value={type} 
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Amount</label>
        <input
          type="number"
          className={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
          min="0.01"
          step="0.01"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Category</label>
        <select 
          className={styles.select}
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories
            .filter(cat => cat.type === type)
            .map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Date</label>
        <input
          type="date"
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Comment (optional)</label>
        <input
          type="text"
          className={styles.input}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Description"
        />
      </div>

      <button type="submit" className={styles.button}>
        Add Transaction
      </button>
    </form>
  )
}
import { useEffect } from 'react'

import { fetchTransactions } from '../features/transactions/transactionsSlice'


// import styles from '../styles/pages/Dashboard.module.css'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { items: transactions, status } = useAppSelector(state => state.transactions)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTransactions(user.id))
    }
  }, [dispatch, user?.id])

  // Calculate balance
  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === 'income' 
      ? total + transaction.amount 
      : total - transaction.amount
  }, 0)

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <BalanceCard balance={balance} />
      <TransactionList 
        transactions={transactions.slice(0, 5)} 
        isLoading={status === 'loading'}
      />
    </div>
  )
}
import { useState, useEffect } from 'react';

import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/pages/Statistics.module.css';

export default function Statistics() {
  const { transactions } = useAppSelector(state => state.transactions);
  const [chartType, setChartType] = useState('pie');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [filteredData, setFilteredData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFCC00'];

  useEffect(() => {
    // Filter transactions by date range
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= dateRange.start && transactionDate <= dateRange.end;
    });

    // Group by category and calculate totals
    const categoryData = filtered.reduce((acc, transaction) => {
      const existingCategory = acc.find(item => item.category === transaction.category);
      const amount = parseFloat(transaction.amount);
      
      if (existingCategory) {
        existingCategory.amount += transaction.type === 'income' ? amount : -amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: transaction.type === 'income' ? amount : -amount
        });
      }
      return acc;
    }, []);

    setFilteredData(categoryData);
  }, [transactions, dateRange]);

  return (
    <div className={styles.container}>
      <h2>Transaction Statistics</h2>
      
      <div className={styles.controls}>
        <div className={styles.dateRange}>
          <label>From:</label>
          <DatePicker
            selected={dateRange.start}
            onChange={(date) => setDateRange({...dateRange, start: date})}
            selectsStart
            startDate={dateRange.start}
            endDate={dateRange.end}
          />
          
          <label>To:</label>
          <DatePicker
            selected={dateRange.end}
            onChange={(date) => setDateRange({...dateRange, end: date})}
            selectsEnd
            startDate={dateRange.start}
            endDate={dateRange.end}
            minDate={dateRange.start}
          />
        </div>
        
        <div className={styles.chartToggle}>
          <button
            onClick={() => setChartType('pie')}
            className={chartType === 'pie' ? styles.active : ''}
          >
            Pie Chart
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={chartType === 'bar' ? styles.active : ''}
          >
            Bar Chart
          </button>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        {filteredData.length > 0 ? (
          chartType === 'pie' ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="category"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                <Legend />
                <Bar dataKey="amount" name="Amount">
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )
        ) : (
          <div className={styles.noData}>No transactions in selected date range</div>
        )}
      </div>
    </div>
  );
}
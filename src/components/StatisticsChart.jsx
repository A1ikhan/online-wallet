import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'
import { useState } from 'react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function StatisticsChart({ data, type }) {
  const [chartType, setChartType] = useState('pie')
  
  return (
    <div className="statistics-chart">
      <div className="chart-controls">
        <button onClick={() => setChartType('pie')}>Pie Chart</button>
        <button onClick={() => setChartType('bar')}>Bar Chart</button>
      </div>
      
      {chartType === 'pie' ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
            nameKey="category"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <BarChart width={400} height={400} data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  )
}
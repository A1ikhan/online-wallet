import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import Categories from './pages/Categories'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="stats" element={<Statistics />} />
        <Route path="settings" element={<Categories />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App


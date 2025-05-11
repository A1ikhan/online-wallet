import { Routes, Route } from 'react-router-dom'
import {ProtectedRoute} from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import Categories from './pages/Categories'
import NotFound from "./pages/NotFound"; 

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
      <Route path="/dashboard"  element={<Dashboard />} />
      <Route path="stats" element={<Statistics />} />
      <Route path="settings" element={<Categories />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App


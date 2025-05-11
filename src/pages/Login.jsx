import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api'
import { loginSuccess, loginFailure } from '../features/auth/authSlice'
import styles from '../styles/pages/Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Login started'); // Debug 1
  try {
    await dispatch(loginUser({ email, password })).unwrap();
    console.log('Login succeeded:', result); // Debug 2
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className={styles.input}
          value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {/* <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button> */}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  )
}
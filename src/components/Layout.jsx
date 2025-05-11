import { Outlet, NavLink } from 'react-router-dom'
import styles from '../styles/components/Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2>CoinKeeper</h2>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/stats" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                }
              >
                Statistics
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
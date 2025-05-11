import React from 'react';
import styles from '../styles/pages/Categories.module.css';

export default function Categories() {
  return (
    <div className={styles.container}>
      <h2>Categories Management</h2>
      <div className={styles.content}>
        <p>This is where you'll manage your transaction categories.</p>
        {/* We'll add more functionality here later */}
      </div>
    </div>
  );
}
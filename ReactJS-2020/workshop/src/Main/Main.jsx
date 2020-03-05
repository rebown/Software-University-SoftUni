import React from 'react';
import styles from './Main.module.css';

function Main({ children, title }) {
  return (
    <div className={styles.Main}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default Main;

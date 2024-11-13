import React from 'react';
import styles from './App.module.css';
import SwapForm from './components/SwapForm';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <SwapForm />
    </div>
  );
};

export default App;

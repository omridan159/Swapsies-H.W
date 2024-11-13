import React from 'react';
import styles from './EstimatedFees.module.css';

interface Props {
  estimatedFees: string;
  estimatedTime: string;
}

const EstimatedFees: React.FC<Props> = ({ estimatedFees, estimatedTime }) => {
  return (
    <div className={styles.feesContainer}>
      <h3 className={styles.feesTitle}>Estimated Fees and Transfer Time</h3>
      <ul className={styles.feesList}>
        <li className={styles.feeItem}>
          <span className={styles.feeLabel}>Estimated Fees:</span>
          <span className={styles.feeValue}>{estimatedFees}</span>
        </li>
        <li className={styles.feeItem}>
          <span className={styles.feeLabel}>Estimated Transfer Time:</span>
          <span className={styles.feeValue}>{estimatedTime}</span>
        </li>
      </ul>
    </div>
  );
};

export default EstimatedFees;

import classNames from 'classnames';
import React from 'react';
import styles from './AmountInput.module.css';

interface Props {
  amount: string;
  onChangeAmount: (amount: string) => void;
  error?: string;
}

const AmountInput: React.FC<Props> = ({ amount, onChangeAmount, error }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="amount" className={styles.label}>
        Amount to Swap
      </label>
      <div className={styles.inputWrapper}>
        <input
          id="amount"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => onChangeAmount(e.target.value)}
          className={classNames(styles.input, { [styles.inputError]: !!error })}
          placeholder="Enter amount"
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default AmountInput;

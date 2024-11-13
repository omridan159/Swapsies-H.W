import React from 'react';
import styles from './ResetButton.module.css';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const ResetButton: React.FC<Props> = ({ onClick, disabled = false }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      Start Over
    </button>
  );
};

export default ResetButton;

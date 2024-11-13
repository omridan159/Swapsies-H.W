import React from 'react';
import styles from './SummaryStep.module.css';
import type { Chain, Token } from '@lifi/sdk';

interface Props {
  fromChain?: Chain;
  fromToken?: Token;
  toChain?: Chain;
  toToken?: Token;
  amount: string;
  fromAddress: string;
}

const SummaryStep: React.FC<Props> = ({
  fromChain,
  fromToken,
  toChain,
  toToken,
  amount,
  fromAddress,
}) => {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>From Chain:</span>
        <span className={styles.summaryValue}>{fromChain?.name || 'N/A'}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>From Token:</span>
        <span className={styles.summaryValue}>
          {fromToken?.symbol || 'N/A'}
        </span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>To Chain:</span>
        <span className={styles.summaryValue}>{toChain?.name || 'N/A'}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>To Token:</span>
        <span className={styles.summaryValue}>{toToken?.symbol || 'N/A'}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Amount:</span>
        <span className={styles.summaryValue}>
          {amount} {fromToken?.symbol || ''}
        </span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Wallet Address:</span>
        <span className={styles.summaryValue}>{fromAddress}</span>
      </div>
    </div>
  );
};

export default SummaryStep;

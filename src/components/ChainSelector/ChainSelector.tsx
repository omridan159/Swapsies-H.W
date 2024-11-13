import type { ExtendedChain as Chain } from '@lifi/sdk';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { fetchChains } from '../../services/lifiService';
import styles from './ChainSelector.module.css';

interface Props {
  label: string;
  selectedChain?: Chain;
  onSelectChain: (chain: Chain) => void;
  error?: string;
}

const ChainSelector: React.FC<Props> = ({
  label,
  selectedChain,
  onSelectChain,
  error,
}) => {
  const [chains, setChains] = useState<Chain[]>([]);

  useEffect(() => {
    const loadChains = async () => {
      try {
        const fetchedChains = await fetchChains();
        setChains(fetchedChains);
      } catch (err) {
        console.error('Failed to fetch chains:', err);
      }
    };

    loadChains();
  }, []);

  return (
    <div className={styles.selectorContainer}>
      <label htmlFor={`chain-selector-${label}`} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={`chain-selector-${label}`}
          value={selectedChain?.id || ''}
          onChange={(e) => {
            const chain = chains.find((c) => c.id === Number(e.target.value));
            if (chain) {
              onSelectChain(chain);
            }
          }}
          className={classNames(styles.select, {
            [styles.selectError]: !!error,
          })}
        >
          <option value="">Select Chain</option>
          {chains.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default ChainSelector;

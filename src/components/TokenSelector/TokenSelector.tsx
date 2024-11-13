import React, { useEffect, useState } from 'react';
import styles from './TokenSelector.module.css';
import classNames from 'classnames';
import { fetchTokens } from '../../services/lifiService';
import type { ExtendedChain as Chain, Token } from '@lifi/sdk';

interface Props {
  label: string;
  chain?: Chain;
  selectedToken?: Token;
  onSelectToken: (token: Token) => void;
  error?: string;
}

const TokenSelector: React.FC<Props> = ({
  label,
  chain,
  selectedToken,
  onSelectToken,
  error,
}) => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const loadTokens = async () => {
      if (chain) {
        try {
          const fetchedTokens = await fetchTokens(chain.id);
          setTokens(fetchedTokens);
        } catch (err) {
          console.error('Failed to fetch tokens:', err);
        }
      } else {
        setTokens([]);
      }
    };

    loadTokens();
  }, [chain]);

  return (
    <div className={styles.selectorContainer}>
      <label htmlFor={`token-selector-${label}`} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={`token-selector-${label}`}
          value={selectedToken?.address || ''}
          onChange={(e) => {
            const token = tokens.find((t) => t.address === e.target.value);
            if (token) {
              onSelectToken(token);
            }
          }}
          disabled={!chain}
          className={classNames(styles.select, {
            [styles.selectError]: !!error,
          })}
        >
          <option value="">Select Token</option>
          {tokens.map((token) => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default TokenSelector;

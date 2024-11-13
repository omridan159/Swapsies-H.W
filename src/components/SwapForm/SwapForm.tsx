import classNames from 'classnames';
import React from 'react';
import useSwapForm, { Step } from '../../hooks/useSwapForm';
import { validateAddress, validateAmount } from '../../utils/validation';
import AmountInput from '../AmountInput';
import ChainSelector from '../ChainSelector';
import EstimatedFees from '../EstimatedFees';
import LoadingSpinner from '../LoadingSpinner';
import NavigationButtons from '../NavigationButtons';
import ResetButton from '../ResetButton';
import SummaryStep from '../SummaryStep';
import TokenSelector from '../TokenSelector';
import styles from './SwapForm.module.css';

const SwapForm: React.FC = () => {
  const {
    currentStep,
    fromChain,
    toChain,
    fromToken,
    toToken,
    amount,
    fromAddress,
    quoteData,
    loadingQuote,
    error,
    addressError,
    swapSuccess,
    setFromChain,
    setToChain,
    setFromToken,
    setToToken,
    setAmount,
    setFromAddress,
    nextStep,
    prevStep,
    resetForm,
    setAddressError,
    handleCalculate,
    setError,
  } = useSwapForm();

  const handleNext = () => {
    let hasError = false;

    switch (currentStep) {
      case Step.FromChain:
        if (!fromChain) {
          setError('Please select a source chain.');
          hasError = true;
        }
        break;
      case Step.FromToken:
        if (!fromToken) {
          setError('Please select a source token.');
          hasError = true;
        }
        break;
      case Step.ToChain:
        if (!toChain) {
          setError('Please select a destination chain.');
          hasError = true;
        }
        break;
      case Step.ToToken:
        if (!toToken) {
          setError('Please select a destination token.');
          hasError = true;
        }
        break;
      case Step.Amount:
        if (!validateAmount(amount)) {
          setError('Amount must be greater than zero.');
          hasError = true;
        }
        break;
      case Step.WalletAddress:
        if (!validateAddress(fromAddress)) {
          setAddressError('Please enter a valid Ethereum address.');
          hasError = true;
        }
        break;
      case Step.Summary:
        // No validation needed; proceed to Estimates
        break;
      default:
        break;
    }

    if (!hasError) {
      setError('');
      nextStep();
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Token Swap</h2>

      {currentStep === Step.FromChain && (
        <>
          <ChainSelector
            label="From Chain"
            selectedChain={fromChain}
            onSelectChain={setFromChain}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
          <NavigationButtons onNext={handleNext} showBack={false} />
        </>
      )}

      {currentStep === Step.FromToken && (
        <>
          <TokenSelector
            label="From Token"
            chain={fromChain}
            selectedToken={fromToken}
            onSelectToken={setFromToken}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
          <NavigationButtons onNext={handleNext} onBack={prevStep} />
        </>
      )}

      {currentStep === Step.ToChain && (
        <>
          <ChainSelector
            label="To Chain"
            selectedChain={toChain}
            onSelectChain={setToChain}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
          <NavigationButtons onNext={handleNext} onBack={prevStep} />
        </>
      )}

      {currentStep === Step.ToToken && (
        <>
          <TokenSelector
            label="To Token"
            chain={toChain}
            selectedToken={toToken}
            onSelectToken={setToToken}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
          <NavigationButtons onNext={handleNext} onBack={prevStep} />
        </>
      )}

      {currentStep === Step.Amount && (
        <>
          <AmountInput
            amount={amount}
            onChangeAmount={setAmount}
            error={
              !validateAmount(amount)
                ? 'Amount must be greater than zero.'
                : undefined
            }
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
          <NavigationButtons onNext={handleNext} onBack={prevStep} />
        </>
      )}

      {currentStep === Step.WalletAddress && (
        <>
          <label htmlFor="from-address" className={styles.addressLabel}>
            Your Wallet Address
          </label>
          <input
            id="from-address"
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            placeholder="0x..."
            className={classNames(styles.addressInput, {
              [styles.errorInput]: !!addressError,
            })}
          />
          {addressError && (
            <span className={styles.errorMessage}>{addressError}</span>
          )}
          {error && <span className={styles.errorMessage}>{error}</span>}
          <NavigationButtons onNext={handleNext} onBack={prevStep} />
        </>
      )}

      {currentStep === Step.Summary && (
        <>
          <SummaryStep
            fromChain={fromChain}
            fromToken={fromToken}
            toChain={toChain}
            toToken={toToken}
            amount={amount}
            fromAddress={fromAddress}
          />
          <NavigationButtons
            onNext={handleCalculate}
            onBack={prevStep}
            nextButtonText={'Calculate'}
          />
        </>
      )}

      {currentStep === Step.Estimates && (
        <>
          {loadingQuote && <LoadingSpinner />}
          {error && <span className={styles.errorMessage}>{error}</span>}
          {swapSuccess && (
            <span className={styles.successMessage}>{swapSuccess}</span>
          )}
          {quoteData && (
            <EstimatedFees
              estimatedFees={quoteData.estimatedFees}
              estimatedTime={quoteData.estimatedTime}
            />
          )}
          <ResetButton onClick={resetForm} />
        </>
      )}
    </div>
  );
};

export default SwapForm;

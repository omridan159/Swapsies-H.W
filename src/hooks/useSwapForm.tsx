import type { ExtendedChain as Chain, Token } from '@lifi/sdk';
import { useEffect, useState } from 'react';
import { QuoteParams, useGetQuote } from '../queries/quotes';
import { validateAddress, validateAmount } from '../utils/validation';

export enum Step {
  FromChain = 1,
  FromToken,
  ToChain,
  ToToken,
  Amount,
  WalletAddress,
  Summary,
  Estimates,
}

interface QuoteData {
  estimatedFees: string;
  estimatedTime: string;
}

interface UseSwapFormReturn {
  currentStep: Step;
  fromChain?: Chain;
  toChain?: Chain;
  fromToken?: Token;
  toToken?: Token;
  amount: string;
  fromAddress: string;
  quoteData?: QuoteData;
  loadingQuote: boolean;
  error: string;
  addressError: string;
  swapSuccess: string;
  setFromChain: (chain: Chain) => void;
  setToChain: (chain: Chain) => void;
  setFromToken: (token: Token) => void;
  setToToken: (token: Token) => void;
  setAmount: (amount: string) => void;
  setFromAddress: (address: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  setError: (error: string) => void;
  setAddressError: (error: string) => void;
  handleCalculate: () => void;
}

const useSwapForm = (): UseSwapFormReturn => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.FromChain);
  const [fromChain, setFromChain] = useState<Chain>();
  const [toChain, setToChain] = useState<Chain>();
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [amount, setAmount] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [quoteData, setQuoteData] = useState<QuoteData>();
  const [error, setError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [swapSuccess, setSwapSuccess] = useState('');

  const quoteParams: QuoteParams | undefined =
    fromChain &&
    toChain &&
    fromToken &&
    toToken &&
    amount &&
    fromAddress &&
    validateAmount(amount) &&
    validateAddress(fromAddress)
      ? {
          fromChain: fromChain.id,
          toChain: toChain.id,
          fromToken: fromToken.address,
          toToken: toToken.address,
          fromAmount: (Number(amount) * 10 ** fromToken.decimals).toString(),
          fromAddress: fromAddress,
        }
      : undefined;

  const {
    data: fetchedQuoteData,
    isLoading: isLoadingQuote,
    isError: isQuoteError,
    error: quoteError,
  } = useGetQuote(
    quoteParams!,
    fromToken ? fromToken.decimals : 0,
    fromToken ? fromToken.symbol : '',
    { enabled: currentStep === Step.Estimates }
  );

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetForm = () => {
    setCurrentStep(Step.FromChain);
    setFromChain(undefined);
    setToChain(undefined);
    setFromToken(undefined);
    setToToken(undefined);
    setAmount('');
    setFromAddress('');
    setQuoteData(undefined);
    setError('');
    setAddressError('');
    setSwapSuccess('');
  };

  const handleCalculate = () => {
    nextStep();
  };

  useEffect(() => {
    if (currentStep === Step.Estimates) {
      if (isLoadingQuote) {
        setError('');
      } else if (isQuoteError) {
        setError(quoteError?.message || 'Failed to fetch quote.');
        setQuoteData(undefined);
      } else if (fetchedQuoteData) {
        setQuoteData(fetchedQuoteData);
      }
    }
  }, [currentStep, isLoadingQuote, isQuoteError, quoteError, fetchedQuoteData]);

  return {
    currentStep,
    fromChain,
    toChain,
    fromToken,
    toToken,
    amount,
    fromAddress,
    quoteData,
    loadingQuote: isLoadingQuote,
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
    setError,
    setAddressError,
    handleCalculate,
  };
};

export default useSwapForm;

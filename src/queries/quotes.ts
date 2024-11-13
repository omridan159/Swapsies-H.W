import { useQuery } from '@tanstack/react-query';
import { fetchQuote } from '../services/lifiService';
import { QueryKeyFactory } from './keys';

interface QuoteData {
  estimatedFees: string;
  estimatedTime: string;
}

export interface QuoteParams {
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  fromAddress: string;
}

export function useGetQuote(
  params: QuoteParams,
  fromTokenDecimals: number,
  fromTokenSymbol: string,
  options?: { enabled?: boolean }
) {
  return useQuery<QuoteData, Error>({
    queryKey: QueryKeyFactory.getQuote(params),
    queryFn: async () => {
      const quote = await fetchQuote(params);

      const totalFeeCosts = quote.estimate.feeCosts?.reduce(
        (total, feeCost) => total + Number(feeCost.amount),
        0
      );

      const estimatedTimeInMinutes = Math.ceil(
        quote.estimate.executionDuration / 60
      );

      const data: QuoteData = {
        estimatedFees: totalFeeCosts
          ? `${(totalFeeCosts / 10 ** fromTokenDecimals).toFixed(6)} ${fromTokenSymbol}`
          : 'N/A',
        estimatedTime: estimatedTimeInMinutes
          ? `${estimatedTimeInMinutes} minutes`
          : 'N/A',
      };

      return data;
    },
    enabled: options?.enabled ?? false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

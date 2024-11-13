import { QuoteParams } from './quotes';

export const enum QueryKeyPrefix {
  getQuote = 'getQuote',
}

export const SimpleQueryKey = {
  getQuote: [QueryKeyPrefix.getQuote],
} as const;

export const QueryKeyFactory = {
  getQuote: (params: QuoteParams) => [QueryKeyPrefix.getQuote, { params }],
};

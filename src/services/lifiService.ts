import {
  ChainId,
  ChainsRequest,
  createConfig,
  ExtendedChain,
  getChains,
  getQuote,
  getTokens,
  LiFiStep,
  QuoteRequest,
  Token as SdkToken,
  TokensResponse,
} from '@lifi/sdk';

createConfig({
  integrator: 'Swapsies',
});

export const fetchChains = async (
  params?: ChainsRequest
): Promise<ExtendedChain[]> => {
  const chains = await getChains(params);
  return chains;
};

export const fetchTokens = async (chainId: ChainId): Promise<SdkToken[]> => {
  const tokensResponse: TokensResponse = await getTokens({ chains: [chainId] });
  const tokens = tokensResponse.tokens[chainId] || [];
  return tokens;
};

export const fetchQuote = async (params: QuoteRequest): Promise<LiFiStep> => {
  const quote = await getQuote(params);
  return quote;
};

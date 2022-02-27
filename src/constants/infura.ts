import { SupportedChainId } from './chains'

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const INFURA_NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.CHARITY]: `http://35.208.109.149:8545`
}
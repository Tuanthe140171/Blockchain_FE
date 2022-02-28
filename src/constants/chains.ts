export enum SupportedChainId {
    CHARITY = 2018
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
    (id) => typeof id === 'number'
  ) as SupportedChainId[]
  
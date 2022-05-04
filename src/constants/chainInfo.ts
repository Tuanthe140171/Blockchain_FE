import { SupportedChainId } from './chains'

export type ChainInfoMap = {
    [key in SupportedChainId]: {
        docs: string,
        explorer: string,
        infoLink: string,
        label: string,
        logoUrl: string,
        nativeCurrency: {
            name: string,
            symbol: string,
            decimals: number
        }
    }
}

export const CHAIN_INFO: ChainInfoMap = {
    [SupportedChainId.CHARITY]: {
        docs: 'https://docs.uniswap.org/',
        explorer: 'https://blockscout.charityverse.info',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Extreme',
        logoUrl: "/icon/charity.svg",
        nativeCurrency: { name: 'Vietnamcoin', symbol: 'CRV', decimals: 18 },
    }
};
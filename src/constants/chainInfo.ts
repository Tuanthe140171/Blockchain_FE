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
        explorer: 'https://etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Charity',
        logoUrl: "/icon/charity.svg",
        nativeCurrency: { name: 'Charity', symbol: 'CRV', decimals: 18 },
    }
};
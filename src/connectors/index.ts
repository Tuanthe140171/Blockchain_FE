import { InjectedConnector } from "web3-react-injected-connector";
import { ALL_SUPPORTED_CHAIN_IDS } from "../constants/chains";
import { INFURA_NETWORK_URLS } from "../constants/infura";
import { Web3Provider } from "@ethersproject/providers";
import { NetworkConnector } from "./NetworkConnector";
import getLibrary from '../utils/getLibrary'

export const network = new NetworkConnector({
    urls: INFURA_NETWORK_URLS,
    defaultChainId: 2018,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

export const injected = new InjectedConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

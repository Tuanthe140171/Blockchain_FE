import { getSigner } from "../utils";
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from "ethers";

const domain = {
    version: "1.0.0",
    verifyingContract: "0xFB88dE099e13c3ED21F80a7a1E49f8CAEcF10df6"
};

const types = {
    ProveMessage:  [
        {name: 'message', type: 'string'},
    ]
};

const value = {
    message: "Welcome to CharityVerse"
}

export const verifyTypedMessage = (signature: string, account: string) => {
    return ethers.utils.verifyTypedData(
        domain,
        types,
        value,
        signature
    ) === account;
}

export const signTypedMessage = async (library: Web3Provider, account: string): Promise<string> => {
    const signer = await getSigner(library, account);
    return await signer._signTypedData(domain, types, value);
}
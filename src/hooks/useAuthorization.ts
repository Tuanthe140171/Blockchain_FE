import { useState, useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from "web3-react-core";
import { ethers } from 'ethers';
import useLocalStorage from "./useLocalStorage";

export enum AuthorizeErrorType {
    WRONG_NETWORK,
    NOT_CONNECTED,
    OTHER_ERRORS,
    UNAUTHORIZED,
    NONE
}

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const useAuthorization = (tried: boolean): AuthorizeErrorType => {
    const [authorizeError, setAuthorizeError] = useState<AuthorizeErrorType>(AuthorizeErrorType.NONE);
    const { account, error, library } = useWeb3React();
    const [charityStorage] = useLocalStorage<{
        auth: {
            [account: string]: {
                token: string,
                address: string,
                socketData: string
            }
        }
    }>("charity", {
        auth: {}
    });

    useEffect(() => {
        const tryAuthorize = async () => {
            try {
                const authInfo = charityStorage.auth;
                if (error && error instanceof UnsupportedChainIdError) {
                    setAuthorizeError(AuthorizeErrorType.WRONG_NETWORK);
                } else if (account && library && !error && authInfo && authInfo[account]) {
                    const userInfo = parseJwt(authInfo[account].token);
                    const isAuthorized = ethers.utils.getAddress(userInfo.address) === ethers.utils.getAddress(account);
                    isAuthorized && setAuthorizeError(AuthorizeErrorType.NONE);
                } else if (account && !error && (!authInfo || !authInfo[account])) {
                    setAuthorizeError(AuthorizeErrorType.UNAUTHORIZED);
                } else if (!account || error) {
                    setAuthorizeError(AuthorizeErrorType.NOT_CONNECTED);
                } else {
                    setAuthorizeError(AuthorizeErrorType.NONE);
                }
            } catch (err: any) {
                setAuthorizeError(AuthorizeErrorType.OTHER_ERRORS);
            }
        }

        tried && tryAuthorize();
    }, [account, error, library, charityStorage.auth, tried]);

    return authorizeError;
}

export default useAuthorization;
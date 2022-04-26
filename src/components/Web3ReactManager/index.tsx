import React from 'react';
import { useWeb3React } from 'web3-react-core'
import { useEffect } from 'react'
import { useEagerConnect, useInactiveListener } from '../../hooks/web3'
import useAuthorization, { AuthorizeErrorType } from '../../hooks/useAuthorization';
import { network } from '../../connectors';
import { NetworkContextName } from '../../constants/misc';

export const AuthorizationContext = React.createContext<{ error: AuthorizeErrorType }>({ error: AuthorizeErrorType.NONE });

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
    const { active } = useWeb3React()
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)

    // try to eagerly connect to an injected provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
    const error = useAuthorization(triedEager);

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !networkActive && !networkError && !active) {
            activateNetwork(network)
        }
    }, [triedEager, networkActive, networkError, activateNetwork, active])

    // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
    useInactiveListener(!triedEager)

    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (triedEager && !active && networkError) {
        return (
            <div>
                Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
            </div>
        )
    }

    return <AuthorizationContext.Provider value={{error}}>{children}</AuthorizationContext.Provider>
}
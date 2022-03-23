import type { EthereumProvider } from '../lib/ethereum';
import { useEffect, useState } from 'react'
import { useWeb3React } from 'web3-react-core'
import { isMobile } from 'react-device-detect'

import { injected } from '../connectors'
import { useNavigate } from 'react-router-dom';

export function useEagerConnect() {
    const { activate, active } = useWeb3React() // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized: boolean) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                if (isMobile && window.ethereum) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true)
                    })
                } else {
                    setTried(true)
                }
            }
        })
    }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (active) {
            setTried(true)
        }
    }, [active])

    return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React()
    const navigate = useNavigate();

    useEffect(() => {
        const ethereum = window.ethereum as EthereumProvider | undefined

        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = () => {
                // eat errors
                activate(injected, undefined, true).catch((error) => {
                    console.error('Failed to activate after chain changed', error)
                })
            }

            const handleAccountsChanged = (accounts: string[]) => {
                console.log(accounts);
                if (accounts.length > 0) {
                    // eat errors
                    activate(injected, undefined, true).catch((error) => {
                        console.error('Failed to activate after accounts changed', error)
                    })
                } else {
                    navigate("/");
                }
            }

            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            
            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                }
            }
        }
        return undefined
    }, [active, error, suppress, activate])
}
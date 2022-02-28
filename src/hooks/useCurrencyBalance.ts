import { useMemo, useState } from 'react'
import { ethers } from 'ethers'

import useActiveWeb3React from './useActiveWeb3React'
import { isAddress } from '../utils'

export function useNativeCurrencyBalances(uncheckedAddresses?: (string | undefined | null)): string | undefined {
    const [balance, setBalance] = useState<string | undefined>();
    const { library } = useActiveWeb3React()

    const validAddressInputs: string | undefined | null = useMemo(
        () => isAddress(uncheckedAddresses) ? uncheckedAddresses : undefined,
        [uncheckedAddresses]
    )

    useMemo(async () => {
        if (library && validAddressInputs) {
            const provider = new ethers.providers.Web3Provider(library.provider);
            setBalance(ethers.utils.formatEther(await provider.getBalance(validAddressInputs)));
            return;
        }
        
        setBalance("0");
    }, [library, validAddressInputs]);

    return balance;
}
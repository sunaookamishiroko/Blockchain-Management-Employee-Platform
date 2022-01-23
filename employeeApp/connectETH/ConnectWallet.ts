import React from 'react';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { laborContract } from "./Transaction";

export async function connectWallet() {
    const connector = useWalletConnect();

    const connectWallet = React.useCallback(() => {
        return connector.connect();
    }, [connector]);

    const checkIsExist = async () => {
        
        let result = await laborContract
        .getPersonInformation(connector.accounts[0], { from : connector.accounts[0] });
        
        if (result[1] == "")
        else

    }
    await connectWallet();
    await checkIsExist();
}
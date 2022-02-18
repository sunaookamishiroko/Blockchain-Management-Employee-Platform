import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import SimpleStorageContract from "../contracts/SimpleStorage.json";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

export const infuraProvider = new ethers.providers.InfuraProvider("ropsten", PROVIDER_APIKEY);
export const laborContract = new ethers.Contract(CONTRACT_ADDRESS1, SimpleStorageContract.abi, infuraProvider);

export async function makeLabortxobj(from: string, abidata: string, gaslimit: number) {

  let nonce = await infuraProvider.getTransactionCount(from, "latest");
  let gasfee = (await infuraProvider.getGasPrice())._hex;

  let txObj = {
      data: abidata,
      from: from,
      gas: gaslimit,
      gasPrice: gasfee,
      nonce: nonce,
      to: CONTRACT_ADDRESS1,
      value: "0x00"
  };
  return txObj;
}

export async function makeTokentxobj(from: string, abidata: string, gaslimit: number) {

  let nonce = await infuraProvider.getTransactionCount(from, "latest");
  let gasfee = (await infuraProvider.getGasPrice())._hex;

  let txObj = {
      data: abidata,
      from: from,
      gas: gaslimit,
      gasPrice: gasfee,
      nonce: nonce,
      to: CONTRACT_ADDRESS2,
      value: "0x00"
  };
  return txObj;
}
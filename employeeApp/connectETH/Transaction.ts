import { PROVIDER_APIKEY, LABORCONTRACT_ADDRESS, ERC20_ADDRESS, MYNFT_ADDRESS, WONTOKEN_ADDRESS} from "@env";

import LaborContractABI from "../contracts/LaborContract.json";
import ERC20ContractABI from "../contracts/ERC20.json";
import NFTContractABI from "../contracts/myNFT.json";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

export const infuraProvider = new ethers.providers.InfuraProvider("ropsten", PROVIDER_APIKEY);

export const laborContract = new ethers.Contract(LABORCONTRACT_ADDRESS, LaborContractABI.abi, infuraProvider);
export const ERC20Contract = new ethers.Contract(ERC20_ADDRESS, ERC20ContractABI.abi, infuraProvider);
export const NFTContract = new ethers.Contract(MYNFT_ADDRESS, NFTContractABI.abi, infuraProvider);

export async function makeLabortxobj(from: string, abidata: string, gaslimit: number) {

  let nonce = await infuraProvider.getTransactionCount(from, "latest");
  let gasfee = (await infuraProvider.getGasPrice())._hex;

  let txObj = {
      data: abidata,
      from: from,
      gas: gaslimit,
      gasPrice: gasfee,
      nonce: nonce,
      to: LABORCONTRACT_ADDRESS,
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
      to: ERC20_ADDRESS,
      value: "0x00"
  };
  return txObj;
}

export async function makeNfttxobj(from: string, abidata: string, gaslimit: number) {

  let nonce = await infuraProvider.getTransactionCount(from, "latest");
  let gasfee = (await infuraProvider.getGasPrice())._hex;

  let txObj = {
      data: abidata,
      from: from,
      gas: gaslimit,
      gasPrice: gasfee,
      nonce: nonce,
      to: MYNFT_ADDRESS,
      value: "0x00"
  };
  return txObj;
}
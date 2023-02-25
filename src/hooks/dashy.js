import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { WalletAdapterNewtwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  Publickey,
  SystemProgram,
  Transacion,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";

export const useDashy = () => {
  const [userAddress, setUserAddress] = useState("11111");
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected) {
      setUserAddress(publicKey.toString());
    }
  });

  return { connected, publicKey, userAddress };
};

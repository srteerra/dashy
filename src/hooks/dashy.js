import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";

export const useDashy = () => {
  const [userAddress, setUserAddress] = useState("11111");
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [transactionPurpose, setTransactionPurpose] = useState("");

  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // Setting the user address if the wallet is connected
  useEffect(() => {
    if (connected) {
      setUserAddress(publicKey.toString());
    }
  }, [connected]);

  const makeTransaction = async (fromWallet, toWallet, amount, reference) => {
    console.log(fromWallet);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    // blockhash
    const { blockhash } = await connection.getLatestBlockhash("finalized");

    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: fromWallet,
    });

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: fromWallet,
      lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
      toPubkey: toWallet,
    });

    transferInstruction.keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
    });

    transaction.add(transferInstruction);

    return transaction;
  };

  const doTransaction = async (amount, receiver, transactionPurpose) => {
    const fromWallet = publicKey;
    const toWallet = new PublicKey(
      "ou7b5deTXpwgAGEQMfmGR8yo3th2UeBEZdLCHv51yZx"
    );
    const bnAmount = new BigNumber(1);
    const reference = Keypair.generate().publicKey;
    const transaction = await makeTransaction(
      fromWallet,
      toWallet,
      bnAmount,
      reference
    );

    const confirm = await sendTransaction(transaction, connection);
    console.log(confirm);
  };

  return {
    connected,
    publicKey,
    userAddress,
    doTransaction,
    amount,
    setAmount,
    receiver,
    setReceiver,
    transactionPurpose,
    setTransactionPurpose,
  };
};

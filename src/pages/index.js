import { useState } from "react";
import Action from "../components/header/Action";
import NavMenu from "../components/header/NavMenu";
import Profile from "../components/header/Profile";
import SearchBar from "../components/home/SearchInput";
import NewTransactionModal from "../components/transaction/NewTransactionModal";
import TransactionList from "../components/transaction/TransactionList";
import { useWallet } from "@solana/wallet-adapter-react";
import TransactionQRModal from "../components/transaction/TransactionQRModal";
import { Transaction } from "../data/Transaction";

const Home = () => {
  const { connected, publicKey } = useWallet();
  const [userAddress, setUserAddress] = useState(
    "11111111111111111111111111111111"
  );

  const [avatar, setAvatar] = useState(
    "https://images.pexels.com/photos/4519122/pexels-photo-4519122.jpeg?auto=compress&cs=tinysrgb&w=1600"
  );
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen ">
      <header className="flex w-[250px] flex-col bg-[#0bb534] p-12">
        <Profile
          setModalOpen={setTransactionQRModalOpen}
          avatar={avatar}
          userAddress={userAddress}
        />
        <TransactionQRModal
          modalOpen={transactionQRModalOpen}
          setModalOpen={setTransactionQRModalOpen}
          userAddress={userAddress}
          myKey={publicKey}
        />

        <NavMenu connected={connected} publicKey={publicKey} />

        <Action setModalOpen={setNewTransactionModalOpen} />
        <NewTransactionModal
          modalOpen={newTransactionModalOpen}
          setModalOpen={setNewTransactionModalOpen}
        />
      </header>

      <main className="flex flex-1 flex-col">
        <SearchBar />

        <TransactionList connected={connected} transactions={Transaction} />
      </main>
    </div>
  );
};

export default Home;

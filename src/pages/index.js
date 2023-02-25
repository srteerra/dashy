import { useDashy } from "../hooks/dashy";
import { useState } from "react";
import Action from "../components/header/Action";
import NavMenu from "../components/header/NavMenu";
import Profile from "../components/header/Profile";
import SearchBar from "../components/home/SearchInput";
import NewTransactionModal from "../components/transaction/NewTransactionModal";
import TransactionList from "../components/transaction/TransactionList";
import TransactionQRModal from "../components/transaction/TransactionQRModal";
import { Transaction } from "../data/Transaction";

const Home = () => {
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);

  const {
    connected,
    publicKey,
    avatar,
    userAddress,
    userName,
    transactions,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
  } = useDashy();

  return (
    <div className="flex min-h-screen ">
      <header className="flex w-[250px] flex-col bg-[#0bb534] p-12">
        <Profile
          setModalOpen={setTransactionQRModalOpen}
          avatar={avatar}
          userAddress={userAddress}
          userName={userName}
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

        <TransactionList connected={connected} transactions={transactions} />
      </main>
    </div>
  );
};

export default Home;

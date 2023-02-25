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
import Image from "next/image";
import logoIcon from "../assets/icon-white.png";

const Home = () => {
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(false);

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
      <header className="flex w-[270px] flex-col justify-between bg-[#3F2568] p-12">
        <div>
          {connected ? (
            <Profile
              setModalOpen={setTransactionQRModalOpen}
              avatar={avatar}
              userAddress={userAddress}
              userName={userName}
            />
          ) : (
            <Profile
              setModalOpen={setTransactionQRModalOpen}
              avatar={avatar}
              userAddress={"Not connected"}
            />
          )}

          <TransactionQRModal
            modalOpen={transactionQRModalOpen}
            setModalOpen={setTransactionQRModalOpen}
            userAddress={userAddress}
            myKey={publicKey}
            setQrCode={setQrCode}
          />
        </div>

        <div>
          <NavMenu connected={connected} publicKey={publicKey} />

          {connected ? (
            <Action setModalOpen={setNewTransactionModalOpen} />
          ) : (
            <></>
          )}
          <NewTransactionModal
            modalOpen={newTransactionModalOpen}
            setModalOpen={setNewTransactionModalOpen}
          />
        </div>

        <div className="grid place-items-center">
          <Image
            src={logoIcon}
            alt="Logo"
            width="20px"
            height="20px"
            className="max-w-[100px]"
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <SearchBar />

        {connected ? (
          <TransactionList connected={connected} transactions={transactions} />
        ) : (
          <h1 className="mt-10 text-center text-2xl">
            Connect your wallet to see your transactions
          </h1>
        )}
      </main>
    </div>
  );
};

export default Home;

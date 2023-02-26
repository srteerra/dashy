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
import logoHorizontal from "../assets/hor-white.png";
import menuBars from "../assets/menu.png";

const Home = () => {
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const [mobileMenu, setmobileMenu] = useState(false);

  const handleMenu = () => {
    setmobileMenu(!mobileMenu);
  };

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
    <div className="flex h-full">
      {mobileMenu ? (
        <header className="fixed z-20 flex h-screen w-[300px] flex-col justify-between bg-[#3F2568] p-12">
          <div className="grid w-full place-items-center">
            <Image
              src={logoHorizontal}
              alt="Logo"
              className="w-full max-w-[200px]"
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

          <div className="grid w-full place-items-center">
            <button className="text-white underline" onClick={handleMenu}>
              Go back
            </button>
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
      ) : (
        <></>
      )}
      <main className="flex flex-1 flex-col">
        <div className="w-full bg-[#7A49CA] py-20">
          <button className="">
            <Image
              src={menuBars}
              alt="Menu"
              className="absolute top-5 left-5 w-[70px] p-3"
              onClick={handleMenu}
            />
          </button>
          <div>
            {connected ? (
              <Profile
                setModalOpen={setTransactionQRModalOpen}
                avatar={avatar}
                userAddress={userAddress}
                userName={userName}
                connected={connected}
                publicKey={publicKey}
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
              userName={userName}
              myKey={publicKey}
              setQrCode={setQrCode}
            />
          </div>
        </div>
        <div>
          {connected ? (
            <div>
              <div className="my-8 grid w-full place-items-center">
                <SearchBar />
              </div>
              <TransactionList
                connected={connected}
                transactions={transactions}
              />
            </div>
          ) : (
            <h1 className="mt-10 text-center text-2xl">
              Connect your wallet to see your transactions
            </h1>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

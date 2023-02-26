import { useDashy } from "../hooks/dashy";
import { useState, useEffect } from "react";
import Action from "../components/header/Action";
import NavMenu from "../components/header/NavMenu";
import Profile from "../components/header/Profile";
import SearchBar from "../components/home/SearchInput";
import NewTransactionModal from "../components/transaction/NewTransactionModal";
import SettingsModal from "../components/settings/SettingsModal";
import ContactsModal from "../components/settings/ContactsModal";
import TransactionList from "../components/transaction/TransactionList";
import TransactionQRModal from "../components/transaction/TransactionQRModal";
import { Transaction } from "../data/Transaction";
import Image from "next/image";
import logoIcon from "../assets/icon-white.png";
import logoHorizontal from "../assets/hor-white.png";
import waitImage from "../assets/wait.png";
import menuBars from "../assets/menu.png";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Bounce } from "react-awesome-reveal";

const Home = () => {
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [ContactsModalOpen, setContactsModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const [onMobile, setOnMobile] = useState(false);
  const [mobileMenu, setmobileMenu] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const handleMenu = () => {
    setmobileMenu(!mobileMenu);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    if (windowSize[0] >= 1023) {
      setOnMobile(false);
    } else {
      setOnMobile(true);
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const {
    connected,
    publicKey,
    avatar,
    userAddress,
    userName,
    setUserName,
    setAvatar,
    transactions,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
    userTransactions,
  } = useDashy();

  return (
    <div className="flex h-full">
      <SettingsModal
        settingsModalOpen={settingsModalOpen}
        setSettingsModalOpen={setSettingsModalOpen}
        userAddress={userAddress}
        userName={userName}
        setUserName={setUserName}
        setAvatar={setAvatar}
      />
      <ContactsModal
        ContactsModalOpen={ContactsModalOpen}
        setContactsModalOpen={setContactsModalOpen}
        userAddress={userAddress}
        userName={userName}
        setUserName={setUserName}
      />

      {!onMobile ? (
        <div>
          {connected ? (
            <header className="fixed z-20 flex h-screen w-[300px] flex-col justify-between bg-[#3F2568] p-12">
              <div className="grid w-full place-items-center">
                <Image
                  src={logoHorizontal}
                  alt="Logo"
                  className="w-full max-w-[200px]"
                />
              </div>

              <div>
                <NavMenu
                  connected={connected}
                  publicKey={publicKey}
                  setSettingsModalOpen={setSettingsModalOpen}
                  settingsModalOpen={settingsModalOpen}
                  ContactsModalOpen={ContactsModalOpen}
                  setContactsModalOpen={setContactsModalOpen}
                />

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
          ) : (
            <header className="fixed z-20 grid h-screen w-[300px] place-items-center bg-[#3F2568] p-12">
              <div className="grid w-full place-items-center">
                <Bounce>
                  <Image
                    src={logoHorizontal}
                    alt="Logo"
                    className="w-full max-w-[200px]"
                  />
                </Bounce>
              </div>
            </header>
          )}
        </div>
      ) : (
        <div>
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
                <NavMenu
                  connected={connected}
                  publicKey={publicKey}
                  setSettingsModalOpen={setSettingsModalOpen}
                  settingsModalOpen={settingsModalOpen}
                />

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
                  <span className="flex flex-row justify-center">
                    <ArrowLeftCircleIcon width={"25px"} className="mr-2" />
                    Go back
                  </span>
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
        </div>
      )}
      <main className="flex flex-1 flex-col bg-gradient-to-br from-[#7a49ca] via-[#8d61d3] to-[#cbaaff] lg:ml-[300px]">
        <div className="w-full py-20">
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
              avatar={avatar}
            />
          </div>
          {connected ? (
            <div className="mt-16 grid w-full place-items-center">
              <SearchBar />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="rounded-t-[70px] bg-white">
          {connected ? (
            <TransactionList
              connected={connected}
              transactions={userTransactions}
            />
          ) : (
            <div>
              <Image
                src={waitImage}
                alt="Waiting"
                className="mx-auto mt-32 max-w-[200px]"
              />
              <p className="mt-10 text-center text-xl text-gray-400">
                Connect your wallet to see your transactions
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

import Head from "next/head";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WalletConnectionProvider = dynamic(
  () => import(".././context/WalletConectionProvider"),
  {
    ssr: false,
  }
);

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Dashy</title>
      </Head>
      <WalletConnectionProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </WalletConnectionProvider>
    </>
  );
}

export default App;

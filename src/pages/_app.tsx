import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;

import type { NextPage } from "next";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ConnectWalletButton from "@components/ConnectWalletButton";
import { accountId } from "@utils/recoil";
import HomePage from "@components/HomePage";
import PageLayout from "@layouts/PageLayout";

const Home: NextPage = () => {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useRecoilState(accountId);

  return (
    <PageLayout title="Todo">
      {!currentAccount ? (
        <ConnectWalletButton
          setCurrentAccount={setCurrentAccount}
          setCorrectNetwork={setCorrectNetwork}
        />
      ) : (
        <HomePage
          correctNetwork={correctNetwork}
          currentAccount={currentAccount}
        />
      )}
    </PageLayout>
  );
};

export default Home;

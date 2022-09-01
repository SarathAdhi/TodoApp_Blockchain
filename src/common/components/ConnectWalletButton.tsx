import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";

type Props = {
  setCurrentAccount: (accountId: string) => void;
  setCorrectNetwork: (correctNetwork: boolean) => void;
};

const ConnectWalletButton: React.FC<Props> = ({
  setCurrentAccount,
  setCorrectNetwork,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        toast.error("Metamask not detected");
        return;
      }
      const chainId = await ethereum.request({ method: "eth_chainId" });

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        toast.error("You are not connected to the Rinkeby Testnet!");
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      toast.error("Error while connecting to metamask");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="text-xl font-bold py-3 px-5 flex items-center gap-2 bg-[#f1c232] rounded-lg active:scale-95 transition duration-200 ease-in-out"
        onClick={() => {
          setIsLoading(true);

          setTimeout(() => {
            connectWallet();
            setIsLoading(false);
          }, 1000);
        }}
      >
        {isLoading ? "Connecting" : "Connect"} Wallet
        {isLoading && <LoadingAnimation />}
      </button>
    </div>
  );
};

export default ConnectWalletButton;

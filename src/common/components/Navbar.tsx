import { accountId } from "@utils/recoil";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

type Props = {
  // currentAccount: string;
};

export const Navbar: React.FC<Props> = () => {
  const [currentAccount, setCurrentAccount] = useRecoilState(accountId);
  const [isShowFullAddress, setIsShowFullAddress] = useState(false);

  const shortendAddress = `${currentAccount.substring(
    0,
    3
  )}...${currentAccount.substring(
    currentAccount.length - 3,
    currentAccount.length
  )}`;

  return (
    <>
      {currentAccount && (
        <header className="px-2 sticky z-50 top-0 h-12 w-full flex items-center justify-between bg-white">
          <p className="font-semibold text-lg">Tasks</p>

          <div className="flex items-center gap-2">
            <p
              className="bg-orange-300 px-2 py-1 rounded-lg cursor-pointer hidden sm:block"
              onClick={() => setIsShowFullAddress(!isShowFullAddress)}
            >
              {!isShowFullAddress ? shortendAddress : currentAccount}
            </p>

            <button
              onClick={() => setCurrentAccount("")}
              className="bg-red-500 text-white px-2 p-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        </header>
      )}
    </>
  );
};

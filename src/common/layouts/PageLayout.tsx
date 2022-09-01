import Head from "next/head";
import React from "react";
import clsx from "clsx";
import { Navbar } from "../components/Navbar";

type Props = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ title, className, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="w-full bg-[#f3f2ef] min-h-screen flex gap-2 flex-col items-center">
        <Navbar />

        <section
          className={clsx(
            "w-full max-w-[1440px] flex-1 p-5 overflow-auto",
            className
          )}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default PageLayout;

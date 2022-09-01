import React, { useEffect, useState } from "react";
import { Tasks } from "@utils/recoil";
import { getAllTasks } from "@utils/task";
import { useRecoilState } from "recoil";
import { TaskProps } from "../types/task";
import AddTasks from "./AddTasks";
import LoadingAnimation from "./LoadingAnimation";
import TasksList from "./TasksList";

type Props = {
  correctNetwork: boolean;
  currentAccount: TaskProps["id"];
};

const HomePage: React.FC<Props> = ({ correctNetwork, currentAccount }) => {
  const [, setTasks] = useRecoilState(Tasks);
  const [isLoading, setIsLoading] = useState(true);

  const getAllTasksFromBlockChain = async () => {
    const getTasks = await getAllTasks();
    setTasks(getTasks);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentAccount) {
      getAllTasksFromBlockChain();
      setInterval(getAllTasksFromBlockChain, 1000);
    }
  }, [currentAccount]);

  return (
    <div className="flex flex-col gap-5 items-center">
      {correctNetwork ? (
        <>
          <AddTasks />
          {isLoading ? <LoadingAnimation /> : <TasksList />}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>Please connect to the Rinkeby Testnet and reload the page</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

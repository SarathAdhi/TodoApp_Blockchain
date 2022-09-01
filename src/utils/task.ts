import { ethers } from "ethers";
import toast from "react-hot-toast";
import TaskAbi from "../../build/contracts/TaskContract.json";
import { TaskProps } from "../common/types/task";

const TaskContractAddress = process.env.TASK_CONTRACT_ADDRESS!;

const getContractDetails = () => {
  try {
    const { ethereum } = window as any;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const TaskContract = new ethers.Contract(
        TaskContractAddress,
        TaskAbi.abi,
        signer
      );

      return TaskContract;
    } else {
      toast.error("Ethereum object doesn't exist");
    }
  } catch (error) {
    toast.error("Some error might have occured " + JSON.stringify(error));
  }
};

export const getAllTasks = async () => {
  const TaskContract = getContractDetails();

  const allTasks = await TaskContract?.getMyTasks();
  return allTasks;
};

export const addTask = async (
  taskText: TaskProps["taskText"],
  callback: () => void
) => {
  const TaskContract = getContractDetails();

  await TaskContract?.addTask(taskText, false, false)
    .then(() => toast.success("Transaction got approved"))
    .catch((error: any) => {
      if (error.message.includes("user rejected transaction")) {
        toast.error("Transaction got rejected");
        return;
      }
      toast.error(error.message);
      return;
    });

  callback();
};

export const deleteTask = async (key: string, callback: () => void) => {
  const TaskContract = getContractDetails();

  await TaskContract?.deleteTask(key, true)
    .then(() =>
      toast.success(
        "Transaction got approved. Deleting task might take some time.",
        {
          duration: 4000,
        }
      )
    )
    .catch(({ message }: any) => {
      if (message.includes("user rejected transaction"))
        return toast.error("Transaction got rejected");
    });

  callback();
};

export const updateTaskStatus = async (key: string, callback: () => void) => {
  const TaskContract = getContractDetails();

  await TaskContract?.updateTaskStatus(key)
    .then(() =>
      toast.success(
        "Transaction got approved. Updating might take some time.",
        {
          duration: 4000,
        }
      )
    )
    .catch(({ message }: any) => {
      if (message.includes("user rejected transaction"))
        return toast.error("Transaction got rejected");
    });

  callback();
};

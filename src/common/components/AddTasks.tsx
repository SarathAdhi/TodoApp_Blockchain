import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Card from "./Card";
import { addTask } from "@utils/task";
import { Tasks } from "@utils/recoil";

const AddTasks = () => {
  const [tasks] = useRecoilState(Tasks);
  const [input, setInput] = useState("");

  useEffect(() => {
    const isTransacitonSuccessful = tasks.some(
      (task) => task.taskText === input
    );

    if (isTransacitonSuccessful) {
      setInput("");
      toast.success("Task added successfully");
    }
  }, [tasks]);

  const addTaskToBlockchain = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const toastId = toast.loading(
      "Add Task. Waiting for the transaction to get approved..."
    );

    await addTask(input, () => {
      toast.dismiss(toastId);
      setInput("");
    });
  };

  return (
    <Card>
      <form className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task directly to the blockchain"
          className="bg-gray-200 w-full px-3 py-2 rounded-lg focus:outline-none placeholder:text-gray-400"
        />

        {input && (
          <button onClick={addTaskToBlockchain} disabled={!input}>
            <PlusCircleIcon className="w-6 h-6" />
          </button>
        )}
      </form>
    </Card>
  );
};

export default AddTasks;

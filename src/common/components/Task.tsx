import { CheckIcon, TrashIcon, XIcon } from "@heroicons/react/solid";
import { deleteTask, updateTaskStatus } from "@utils/task";
import clsx from "clsx";
import React from "react";
import toast from "react-hot-toast";
import { TaskProps } from "../types/task";

const Task: React.FC<TaskProps> = ({ id: taskId, taskText, isCompleted }) => {
  //

  const handleDeleteTask = async () => {
    const toastId = toast.loading(
      "Delete Task. Waiting for the transaction to get approved..."
    );

    await deleteTask(taskId!, () => {
      toast.dismiss(toastId);
    });
  };

  const handleStatusChange = async () => {
    const toastId = toast.loading(
      "Status Update. Waiting for the transaction to get approved..."
    );

    await updateTaskStatus(taskId!, () => {
      toast.dismiss(toastId);
    });
  };

  return (
    <div
      className={clsx(
        "relative flex gap-3 sm:gap-5 flex-col-reverse sm:flex-row items-end sm:items-start sm:justify-between p-2 rounded-lg",
        isCompleted ? "bg-red-300" : "bg-green-300"
      )}
    >
      <p
        className={clsx(
          "w-full text-left leading-none",
          isCompleted && "line-through"
        )}
      >
        {taskText}
      </p>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={handleDeleteTask}
          className="p-1 bg-red-500 rounded-full border-2 border-white"
        >
          <TrashIcon className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={handleStatusChange}
          className={clsx(
            "p-1 rounded-full border-2 border-white",
            isCompleted ? "bg-red-500" : "bg-green-600"
          )}
        >
          {isCompleted ? (
            <XIcon className="w-4 h-4 text-white" />
          ) : (
            <CheckIcon className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;

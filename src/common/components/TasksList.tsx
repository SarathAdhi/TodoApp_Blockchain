import { Tasks } from "@utils/recoil";
import React from "react";
import { useRecoilState } from "recoil";
import Card from "./Card";
import Task from "./Task";

const TasksList: React.FC = () => {
  const [tasks] = useRecoilState(Tasks);

  return (
    <Card className="flex flex-col gap-2">
      {tasks.length !== 0 ? (
        tasks.map((item, index) => <Task key={index} {...item} />)
      ) : (
        <h4 className="text-center">No tasks added</h4>
      )}
    </Card>
  );
};

export default TasksList;

import { atom } from "recoil";
import type { TaskProps } from "../common/types/task";

export const accountId = atom({
  key: "accountId",
  default: "",
});

export const Tasks = atom({
  key: "Tasks",
  default: [] as TaskProps[],
});

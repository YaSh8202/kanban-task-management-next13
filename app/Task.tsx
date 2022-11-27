import React from "react";
import { Task } from "../typings";

function Task({ task }: { task: Task }) {
  return (
    <div className="bg-white dark:bg-dark-side px-4 py-4 shadow-md rounded-md flex flex-col space-y-1 ">
      <h3 className="text-lg text-gray-700 dark:text-gray-100 font-bold ">
        {task.title}
      </h3>
      <p className="text-xs text-gray-400">
        {task.subtasks?.filter((s) => s.isCompleted).length} of{" "}
        {task.subtasks?.length} substasks
      </p>
    </div>
  );  
}

export default Task;

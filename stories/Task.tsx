import React from "react";
import { Task as taskType } from "../typings";

export function Task({ task }: { task: taskType }) {
  // const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        // onClick={() => setIsOpen(true)}
        className="bg-white cursor-pointer hover:shadow-dark-side/30 dark:hover:shadow-light-main/40 hover:scale-[1.02] duration-100 dark:bg-dark-side px-4 py-4 shadow-md rounded-md flex flex-col space-y-1 "
      >
        <h3 className="text-lg text-gray-700 dark:text-gray-100 font-bold ">
          {task?.title}
        </h3>
        <p className="text-xs text-gray-400">
          {task?.subtasks?.filter((s) => s.isCompleted).length} of{" "}
          {task?.subtasks?.length} substasks
        </p>
      </div>
      {/* {isOpen && (
        <ViewTaskModal isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
      )} */}
    </>
  );
}

// export const Task;

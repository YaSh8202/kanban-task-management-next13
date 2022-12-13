import React from "react";
import useSWR from "swr";
import { Column } from "../typings";
import { TasksFetcher } from "../util/fetcher";
import Task from "./Task";

type Props = {
  column: Column;
};

const tailwindColors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-fuchsia-500",
];

function Column({ column }: Props) {
  const { data: tasks, error } = useSWR(
    `/api/tasks/${column.id}`,
    TasksFetcher
  );

  return (
    <div className="flex flex-col items-start min-w-[15rem] md:min-w-[18rem] space-y-5 mx-3 ">
      <div className="flex flex-row items-center text-gray-500 space-x-2 ">
        <span
          className={`w-3 h-3 ${
            tailwindColors[Math.floor(Math.random() * tailwindColors.length)]
          } rounded-full`}
        ></span>
        <p className=" font-semibold text-xs uppercase tracking-widest">
          {column.name} ({tasks?.length})
        </p>
      </div>
      {tasks ? (
        tasks.map((task) =>
          task ? (
            <div key={task.id} className="w-full">
              <Task task={task} />
            </div>
          ) : null
        )
      ) : (
        <div
          role="status"
          className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700 h-[8rem] mr-4 "
        >
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Column;

import React from "react";
import useSWR from "swr";
import { Column } from "../typings";
import { TasksFetcher } from "../util/fetcher";
import Task from "./Task";

type Props = {
  column: Column;
};

function Column({ column }: Props) {
  const { data: tasks, error } = useSWR(
    `/api/tasks/${column.id}`,
    TasksFetcher
  );

  return (
    <div className="flex flex-col items-start w-72 space-y-5 mx-3 ">
      <div className="flex flex-row items-center text-gray-500 space-x-2 ">
        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
        <p className=" font-semibold text-xs uppercase tracking-widest">
          {column.name} ({column.tasks?.length})
        </p>
      </div>
      {tasks &&
        tasks.map((task) => (
          <div key={task.id} className="w-full">
            <Task task={task} />
          </div>
        ))}
    </div>
  );
}

export default Column;

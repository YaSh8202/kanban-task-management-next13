import React from "react";
import { Column } from "../typings";
import Task from "./Task";

type Props = {
  column: Column;
};

function Column({ column }: Props) {
  return (
    <div className="flex flex-col items-start w-72 space-y-5 mx-3 ">
      <div className="flex flex-row items-center text-gray-500 space-x-2 ">
        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
        <p className=" font-semibold text-xs uppercase tracking-widest">
          {column.name} ({column.tasks?.length})
        </p>
      </div>
      {column.tasks &&
        column.tasks.map((task) => (
          <div key={task} className="w-full">
            <Task />
          </div>
        ))}
    </div>
  );
}

export default Column;

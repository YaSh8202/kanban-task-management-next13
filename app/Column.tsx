import React from "react";
import Task from "./Task";

function Column() {
  return (
    <div className="flex flex-col items-start w-72 space-y-5 ">
      <div className="flex flex-row items-center text-gray-500 space-x-2 ">
        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
        <p className=" font-semibold text-xs uppercase tracking-widest">
          Todo (4)
        </p>
      </div>
      <div className="w-full" >
        <Task />
      </div>
    </div>
  );
}

export default Column;

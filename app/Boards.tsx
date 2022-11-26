import React from "react";
import Column from "./Column";

function Boards() {
  return (
    <div className="overflow-y-hidden overflow-x-auto flex flex-row bg-light-main dark:bg-dark-main h-full p-5 flex-1 ">
      <Column />
    </div>
  );
}

export default Boards;

import React, { useContext } from "react";
import Column from "./Column";
import useSWR from "swr";
import { columnsFetcher } from "../util/fetcher";
import AppContext from "./(providers)/contextProvider";

function Boards() {
  const { selectedBoard } = useContext(AppContext);
  const {
    data: columns,
    error,
    mutate,
  } = useSWR(["/api/getColumns", selectedBoard?.id], columnsFetcher);

  return (
    <div className="overflow-y-hidden overflow-x-auto flex flex-row bg-light-main dark:bg-dark-main h-full p-5 flex-1 ">
      {columns &&
        columns.map((column) => <Column key={column.id} column={column} />)}
    </div>
  );
}

export default Boards;

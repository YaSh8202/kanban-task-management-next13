import React, { useContext } from "react";
import Column from "./Column";
import useSWR from "swr";
import { columnsFetcher } from "../util/fetcher";
import AppContext from "./(providers)/contextProvider";
import EditBoardModal from "./(Modals)/EditBoardModal";
import { useHorizontalScroll } from "../util/useHorizontalScroll";

function Boards() {
  const { selectedBoard } = useContext(AppContext);
  const {
    data: columns,
    error,
    mutate,
  } = useSWR(`/api/getColumns?boardId=${selectedBoard?.id}`, columnsFetcher);
  const scrollRef = useHorizontalScroll();

  // ["/api/getColumns", selectedBoard?.id]
  return (
    <div
      ref={scrollRef}
      className="overflow-y-hidden overflow-x-auto flex flex-row bg-light-main dark:bg-dark-main p-5 scrollbar-thin dark:scrollbar-thumb-dark-side dark:scrollbar-track-dark-main flex-1 scrollbar-thumb-gray-400 scrollbar-track-light-main scrollbar-thumb-rounded-full scrollbar-track-rounded-full "
    >
      {columns &&
        columns.map((column, i) => (
          <Column key={column.id} index={i} column={column} />
        ))}
      {columns && <EditBoardModal columns={columns} />}
    </div>
  );
}

export default Boards;

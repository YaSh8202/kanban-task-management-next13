import { Board, Column } from "../typings";

export const boardsFetcher = async () => {
  const res = await fetch("/api/getBoards");
  const data = await res.json();
  const boards: Board[] = data.boards;
  return boards;
};
export const columnsFetcher = async (url: string, boardId: string) => {
  const res = await fetch(`/api/getColumns?boardId=${boardId}`);
  const data = await res.json();
  const columns: Column[] = data.columns;
  return columns;
};

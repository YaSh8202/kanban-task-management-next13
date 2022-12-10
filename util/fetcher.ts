import { Board, Column, Task } from "../typings";

export const boardsFetcher = async () => {
  const res = await fetch("/api/getBoards");
  const data = await res.json();
  const boards: Board[] = data.boards;
  return boards.sort((a, b) => a.name.localeCompare(b.name));
};
export const columnsFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  const columns: Column[] = data.columns;
  return columns.sort((a, b) => a.name.localeCompare(b.name));
};
export const TasksFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  const columns: Task[] = data.tasks;
  return columns.sort((a, b) => a.title.localeCompare(b.title));
};

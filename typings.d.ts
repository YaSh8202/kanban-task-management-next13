export type SubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subTasks: SubTask[];
};

export type Column = {
  id?: string;
  name: string;
  tasks: Task[];
};

export type Board = {
  id?: string;
  name: string;
  columns: Column[];
};

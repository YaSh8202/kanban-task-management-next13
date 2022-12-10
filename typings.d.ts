export type SubTask = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status?: string;
  subtasks: SubTask[];
};

export type Column = {
  id: string ;
  name: string;
  tasks?: string[];
};

export type Board = {
  id: string;
  name: string;
  columns: String[];
};

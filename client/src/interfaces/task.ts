export interface ITask {
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
}

export interface ITaskInfo extends ITask {
  createdAt: string;
  updatedAt: string;
}

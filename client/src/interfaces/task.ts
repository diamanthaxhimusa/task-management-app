export interface ITask {
  _id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  list: string;
}

export interface ITaskInfo extends ITask {
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCreateReqDTO {
  title: string;
  description: string;
  due_date: string;
}

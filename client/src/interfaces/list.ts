import { ITask } from './task';

export interface IList {
  title: string;
  description: string;
  tasks: ITask[];
  createdAt: string;
  updatedAt: string;
}

export interface IListCreateReqDTO {
  title: string;
  description: string;
  tasks: string[];
}

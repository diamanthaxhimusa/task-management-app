import { ITaskInfo } from './task';

export interface IList {
  _id: string;
  title: string;
  description: string;
  tasks: ITaskInfo[];
  createdAt: string;
  updatedAt: string;
}

export interface IListCreateReqDTO {
  title: string;
  description: string;
  tasks: string[];
}

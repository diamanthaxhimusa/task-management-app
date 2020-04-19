import api from '.';
import endpoints from '../utils/constants/endpoints';
import { IUserLoginReqDTO, IUserRegisterReqDTO } from '../interfaces/user';
import { ITaskCreateReqDTO } from '../interfaces/task';
import { IListCreateReqDTO } from '../interfaces/list';

export const userLogin = (data: IUserLoginReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.login,
    data
  });

export const userRegister = (data: IUserRegisterReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.register,
    data
  });

export const userEdit = (data: any) =>
  api({
    method: 'PUT',
    url: endpoints.editUser,
    data
  });

export const getMyProfile = () =>
  api({
    method: 'GET',
    url: endpoints.me
  });

export const createTask = (data: ITaskCreateReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.tasks,
    data
  });

export const getTasks = () =>
  api({
    method: 'GET',
    url: endpoints.tasks
  });

export const completeTask = (completed: boolean, taskId: string) =>
  api({
    method: 'PUT',
    url: endpoints.completeTask(taskId),
    data: { completed }
  });

export const taskUpdate = (taskId: string) =>
  api({
    method: 'PUT',
    url: endpoints.singleTask(taskId)
  });

export const taskDelete = (taskId: string) =>
  api({
    method: 'DELETE',
    url: endpoints.singleTask(taskId)
  });

export const createList = (data: IListCreateReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.lists,
    data
  });

export const getLists = () =>
  api({
    method: 'GET',
    url: endpoints.lists
  });

export const listUpdate = (listId: string) =>
  api({
    method: 'PUT',
    url: endpoints.singleList(listId)
  });

export const listDelete = (listId: string) =>
  api({
    method: 'DELETE',
    url: endpoints.singleList(listId)
  });

import api from '.';
import endpoints from '../utils/constants/endpoints';
import { IUserLoginReqDTO, IUserRegisterReqDTO } from '../interfaces/user';
import { ITaskCreateReqDTO } from '../interfaces/task';

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

export const createTask = ({ title, description, due_date }: ITaskCreateReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.tasks,
    data: { title, description, due_date }
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

export const taskDelete = (taskId: string) =>
  api({
    method: 'DELETE',
    url: endpoints.deleteTask(taskId)
  });

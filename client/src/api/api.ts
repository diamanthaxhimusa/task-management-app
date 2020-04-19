import api from '.';
import endpoints from '../utils/constants/endpoints';
import { IUserLoginReqDTO, IUserRegisterReqDTO } from '../interfaces/user';
import { ITaskCreateReqDTO } from '../interfaces/task';

export const userLogin = ({ email, password }: IUserLoginReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.login,
    data: { email, password }
  });

export const userRegister = ({ firstName, lastName, email, password }: IUserRegisterReqDTO) =>
  api({
    method: 'POST',
    url: endpoints.register,
    data: { firstName, lastName, email, password }
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

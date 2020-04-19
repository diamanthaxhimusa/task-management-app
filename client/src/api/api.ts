import api from '.';
import endpoints from '../utils/constants/endpoints';
import { IUserLoginReqDTO, IUserRegisterReqDTO } from '../interfaces/user';

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

import { action, observable } from 'mobx';
import { IUserInfo, IUserLoginReqDTO, IUserRegisterReqDTO } from '../interfaces/user';
import { userLogin, userRegister } from '../api/api';
import { setAccessToken, removeAccessToken } from '../utils/token';
import { Route } from '../utils/enums/routes';

export class UserStore {
  @observable public user: IUserInfo | null = null;

  @action public setUser = (user: IUserInfo | null) => {
    this.user = user;
  };

  @action public loginUser = async (data: IUserLoginReqDTO): Promise<{ isSuccess: boolean }> => {
    try {
      const response = await userLogin(data);
      setAccessToken(response.data.token);
      this.setUser(response.data.user);
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      alert('error');
      return { isSuccess: false };
    }
  };

  @action public registerUser = async (
    data: IUserRegisterReqDTO
  ): Promise<{ isSuccess: boolean }> => {
    try {
      const response = await userRegister(data);
      setAccessToken(response.data.token);
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      alert(
        'We were unable to create an account for you.  The email you used is most likely already registered.'
      );
      return { isSuccess: false };
    }
  };

  @action public logout = async () => {
    this.setUser(null);
    removeAccessToken();
  };
}

import { action, observable } from 'mobx';
import { IUserInfo, IUserLoginReqDTO, IUserRegisterReqDTO } from '../interfaces/user';
import { userLogin, userRegister, userEdit, getMyProfile } from '../api/api';
import { setAccessToken, removeAccessToken } from '../utils/token';

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

  @action public getMe = async (): Promise<any> => {
    try {
      const response = await getMyProfile();
      this.setUser(response.data);
      return true;
    } catch (error) {
      // TODO ERRORS
      alert('Error.');
      return false;
    }
  };

  @action public editUser = async (data: any): Promise<{ isSuccess: boolean }> => {
    try {
      const response = await userEdit(data);
      this.setUser(response.data);
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      console.log(error);

      if (error.err) alert(error.err);
      else alert('Error.');
      return { isSuccess: false };
    }
  };

  @action public logout = async () => {
    this.setUser(null);
    removeAccessToken();
  };
}

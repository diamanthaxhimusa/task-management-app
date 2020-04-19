export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserInfo extends IUser {
  createdAt: string;
  updatedAt: string;
}

export interface IUserLoginReqDTO {
  username: string;
  password: string;
}

export interface IUserRegisterReqDTO extends IUser {}

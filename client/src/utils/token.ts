import jwtDecode from 'jwt-decode';
import moment from 'moment';

interface IToken {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

const TOKEN = 'accessToken';

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN) as string;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN);
};

export const isTokenValid = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken) as IToken;
      return moment().unix() < decodedToken.exp;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

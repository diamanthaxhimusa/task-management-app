import jwtDecode from 'jwt-decode';
import moment from 'moment';

interface IToken {
  user_id: number;
  user_name: string;
  action: string;
  jti: string;
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
      const decodedToken = jwtDecode(accessToken) as any;
      console.log('decodedToken', decodedToken);

      return moment().unix() < decodedToken.exp;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

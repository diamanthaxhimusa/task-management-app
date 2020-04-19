import axios from 'axios';
import { Route } from '../utils/enums/routes';
import { isTokenValid, removeAccessToken, getAccessToken } from '../utils/token';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(request => {
  if (isTokenValid() && !request.headers.common['Authorization']) {
    request.headers.common['Authorization'] = getAccessToken();
  }
  return request;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== `/${Route.LOG_IN}` &&
      window.location.pathname !== `/${Route.REGISTER}`
    ) {
      removeAccessToken();
      delete instance.defaults.headers.common['Authorization'];
      window.location.pathname = `/${Route.LOG_IN}`;
    }
    return Promise.reject(error.response.data);
  }
);

export default instance;

import { Route } from '../enums/routes';
import Dashboard from '../../routes/dashboard';
import Login from '../../routes/login';
import Register from '../../routes/register';
import Profile from '../../routes/profile';

export interface IRouteProps {
  component: React.FC;
  path: string | string[];
  exact?: boolean;
}

export const privateRoutes: IRouteProps[] = [
  {
    path: `/${Route.DASHBOARD}`,
    component: Dashboard
  },
  {
    path: `/${Route.PROFILE}`,
    component: Profile
  }
];

export const publicRoutes: IRouteProps[] = [
  {
    path: `/${Route.LOG_IN}`,
    component: Login
  },
  {
    path: `/${Route.REGISTER}`,
    exact: true,
    component: Register
  }
];

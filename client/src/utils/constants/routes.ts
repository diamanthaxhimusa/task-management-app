import { Route } from '../enums/routes';
import Dashboard from '../../routes/dashboard';
import Login from '../../routes/login';
import NotFound from '../../routes/not_found';

export interface IRouteProps {
  component: React.FC;
  path: string | string[];
  exact?: boolean;
}

export const privateRoutes: IRouteProps[] = [
  {
    path: `/${Route.DASHBOARD}`,
    component: Dashboard
  }
];

export const publicRoutes: IRouteProps[] = [
  {
    path: `/${Route.LOG_IN}`,
    component: Login
  },
  {
    path: `/${Route.SIGN_UP}`,
    exact: true,
    component: Login
  }
  // {
  //   path: '*',
  //   component: NotFound
  // }
];

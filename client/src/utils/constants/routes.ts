import { Route } from '../enums/routes';
import TasksRoute from '../../routes/tasks';
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
    path: `/${Route.TASKS}`,
    component: TasksRoute
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

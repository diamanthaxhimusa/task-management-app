import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppbarLayout from './components/Appbar';
import Toolbar from '@material-ui/core/Toolbar';

import AppLoading from './components/common/AppLoading';
import NotFound from './routes/not_found';

import { Route as RouteConstants } from './utils/enums/routes';
import { IRouteProps, privateRoutes, publicRoutes } from './utils/constants/routes';
import colors from './utils/theme/colors';
import { isTokenValid } from './utils/token';
import { useStores } from './utils/hooks/useStores';

const Wrapper = styled.div`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
`;

const App: React.FC = () => {
  const { userStore, taskStore, listStore } = useStores();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTasks = async () => {
      if (isTokenValid()) {
        await userStore.getMe();
        await taskStore.getTasks();
        await listStore.getLists();
        setIsLoading(false);
      }
    };
    getTasks();
  }, [userStore]);

  const PrivateRoute = ({ ...rest }) => {
    return isTokenValid() ? (
      <>
        <AppbarLayout />
        <Toolbar />
        <Content>
          <Route {...rest} />
        </Content>
      </>
    ) : (
      <Redirect to={{ pathname: `/${RouteConstants.LOG_IN}` }} />
    );
  };

  const PublicRoute = ({ ...rest }) => {
    return isTokenValid() ? (
      <Redirect to={{ pathname: `/${RouteConstants.DASHBOARD}` }} />
    ) : (
      <Route {...rest} />
    );
  };

  return (
    <>
      {isLoading ? (
        <AppLoading />
      ) : (
        <Wrapper>
          <BrowserRouter>
            <Switch>
              <PrivateRoute
                path="/"
                exact={true}
                component={() => {
                  const pathname = `/${RouteConstants.DASHBOARD}`;
                  return <Redirect to={{ pathname }} />;
                }}
              />
              {privateRoutes.map(({ ...rest }, i: number) => (
                <PrivateRoute {...rest} key={`public-route-${i}`} />
              ))}
              {publicRoutes.map(({ ...rest }, i: number) => (
                <PublicRoute {...rest} key={`public-route-${i}`} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </Wrapper>
      )}
    </>
  );
};

export default App;

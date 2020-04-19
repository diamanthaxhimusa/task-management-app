import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppLoading from './components/common/AppLoading';
import NotFound from './routes/not_found';
import { Route as RouteConstants } from './utils/enums/routes';
import { IRouteProps, privateRoutes, publicRoutes } from './utils/constants/routes';
import colors from './utils/theme/colors';
import { isTokenValid } from './utils/token';

const Wrapper = styled.div`
  flex: 1;
  background-color: ${colors.background};
`;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 300);

  const PrivateRoute = ({ ...rest }) => {
    return isTokenValid() ? (
      <Route {...rest} />
    ) : (
      <Redirect to={{ pathname: `/${RouteConstants.LOG_IN}` }} />
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
                <Route {...rest} key={`public-route-${i}`} />
              ))}
              {/* <Route component={NotFound} /> */}
            </Switch>
          </BrowserRouter>
        </Wrapper>
      )}
    </>
  );
};

export default App;

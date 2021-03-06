import React, { useState } from 'react';
import {
  IconButton,
  MenuItem,
  Toolbar,
  Hidden,
  Typography,
  Drawer,
  Menu,
  AppBar,
  Button
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Route } from '../utils/enums/routes';
import { useStores } from '../utils/hooks/useStores';

interface IAppbarLayoutProps {}

const useStyles = makeStyles(theme => ({
  appbar: {
    zIndex: 1201
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  }
}));

const AppbarLayout: React.FC<IAppbarLayoutProps> = () => {
  const { userStore } = useStores();
  const classes = useStyles();
  const { push } = useHistory();

  const signout = () => {
    userStore.logout();
    push('/');
  };

  return (
    <AppBar color="primary" position="fixed" className={classes.appbar}>
      <Toolbar>
        <Typography component={Link} to={`/${Route.TASKS}`} variant="h6" color="inherit">
          T M A
        </Typography>
        <div className={classes.grow}>
          <Button component={Link} to={`/${Route.TASKS}`} color="inherit">
            Tasks
          </Button>
          <Button component={Link} to={`/${Route.LISTS}`} color="inherit">
            Lists
          </Button>
        </div>
        <Button component={Link} to={`/${Route.PROFILE}`} color="inherit">
          My Account
        </Button>
        <Button onClick={signout} color="inherit">
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppbarLayout;

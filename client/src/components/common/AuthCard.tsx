import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

interface IAuthCardProps {
  title: string;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const AuthCard: React.FC<IAuthCardProps> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Paper classes={{ root: classes.paper }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthCard;

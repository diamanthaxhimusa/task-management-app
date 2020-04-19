import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

interface ICardProps {}

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

const Card: React.FC<ICardProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Paper classes={{ root: classes.paper }}>{children}</Paper>
    </Container>
  );
};

export default Card;

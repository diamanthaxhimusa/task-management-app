import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AuthCard from '../components/common/AuthCard';
import { Route } from '../utils/enums/routes';
import { userLogin } from '../api/api';
import { setAccessToken } from '../utils/token';

interface ILoginProps {}

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login: React.FC<ILoginProps> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await userLogin({
      email,
      password
    });
    setAccessToken(response.data.token);
    push(`/${Route.DASHBOARD}`);
  };

  return (
    <AuthCard title="Log In">
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onInput={e => {
            const target = e.target as HTMLInputElement;
            setEmail(target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onInput={e => {
            const target = e.target as HTMLInputElement;
            setPassword(target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link component={RouterLink} to={`/${Route.REGISTER}`} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthCard>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AuthCard from '../components/common/AuthCard';
import { Route } from '../utils/enums/routes';
import { useStores } from '../utils/hooks/useStores';

interface IRegisterProps {}

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register: React.FC<IRegisterProps> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const { userStore } = useStores();
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await userStore.registerUser({
      firstName,
      lastName,
      email,
      password
    });
    if (isSuccess) {
      push(`/${Route.DASHBOARD}`);
    }
  };

  return (
    <AuthCard title="Register">
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onInput={e => {
                const target = e.target as HTMLInputElement;
                setFirstName(target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={lastName}
              onInput={e => {
                const target = e.target as HTMLInputElement;
                setLastName(target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onInput={e => {
                const target = e.target as HTMLInputElement;
                setEmail(target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to={`/${Route.LOG_IN}`} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthCard>
  );
};

export default Register;

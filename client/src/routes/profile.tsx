import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../components/common/Card';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Route } from '../utils/enums/routes';
import { useStores } from '../utils/hooks/useStores';

interface IProfileProps {}

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  edit: {
    position: 'absolute',
    right: 0,
    top: 0
  }
}));

const Profile: React.FC<IProfileProps> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const { userStore } = useStores();
  const [email, setEmail] = useState<string>(userStore.user?.email || '');
  const [firstName, setFirstName] = useState<string>(userStore.user?.firstName || '');
  const [lastName, setLastName] = useState<string>(userStore.user?.lastName || '');
  const [edit, setEdit] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await userStore.editUser({
      firstName,
      lastName,
      email
    });
    if (isSuccess) setEdit(false);
  };

  const editProfile = () => {
    setEdit(true);
  };

  return (
    <Card>
      Profile
      <IconButton onClick={editProfile} classes={{ root: classes.edit }} aria-label="edit">
        <EditIcon />
      </IconButton>
      {edit ? (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      ) : (
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {firstName} {lastName}
            </Grid>
            <Grid item xs={12}>
              {email}
            </Grid>
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default observer(Profile);

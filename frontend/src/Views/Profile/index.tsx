import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../../Components/Header';
import TextField from '@material-ui/core/TextField';

import { useUser } from '../../Context/user-context';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  leftIcon: {
    marginRight: theme.spacing(3),
  },
}));

const Profile = () => {
  const user = useUser();
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            User Profile
          </Typography>

          <TextField
            id='outlined-name'
            label='Name'
            name='name'
            className='d'
            defaultValue={user.data.name}
            fullWidth={true}
            margin='normal'
            variant='outlined'
            disabled
          />

          <TextField
            id='outlined-name'
            label='Last Name'
            name='surname'
            className='d'
            defaultValue={user.data.surname}
            fullWidth={true}
            margin='normal'
            variant='outlined'
            disabled
          />

          <TextField
            id='outlined-name'
            label='E-mail'
            name='email'
            className='d'
            defaultValue={user.data.email}
            fullWidth={true}
            margin='normal'
            variant='outlined'
            disabled
          />
        </Paper>
      </main>
    </React.Fragment>
  );
};
export default Profile;

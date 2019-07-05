import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../Context/auth-context';
import { NotificationsContext, Status } from '../../Context/notification-context';
import {GoogleReCaptchaProvider, GoogleReCaptcha} from 'react-google-recaptcha-v3';
import './Registration.scss';

interface RegistrationregState {
  isRegistered: boolean;
  recaptchaValue: string | null;
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  'paper': {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  'avatar': {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  'title': {
    marginBottom: theme.spacing(3),
  },
  'form': {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  'submit': {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Registration = () => {
  const classes = useStyles();

  // use hook for regState management
  const initialregState: RegistrationregState = {
    isRegistered: false,
    recaptchaValue: null,
  };

  const recaptchaSiteKey: string | null =
    (window as any)._env_.REACT_APP_GOOGLE_SITE_KEY || process.env.REACT_APP_GOOGLE_SITE_KEY || null;
  const [state, updateState] = useState(initialregState);
  const [form, updateform] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const updateValue = (e: any) => {
    updateform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // use user Context
  const auth = useAuth();
  const context = useContext(NotificationsContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    auth.register(form, state.recaptchaValue).then((response) => {
      let message: string, type: Status;
      switch (response) {
        case 201:
          message = 'Your account was created, you can login now!';
          type = Status.success;
          updateState({ ...state, isRegistered: true });
          break;

        case 500:
          message = 'Server connection refused.';
          type = Status.error;
          break;

        default:
          message = 'Registration failed.';
          type = Status.error;
          break;
      }
      context.showNotification(message, type);
    });
  };

  const checkRecaptcha = (value: string | null) => {
    updateState({ ...state, recaptchaValue: value });
  };

  const registrationPage = (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey || ''}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5' className={classes.title}>
            Sign up
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='name'
                  onChange={updateValue}
                  variant='outlined'
                  required={true}
                  fullWidth={true}
                  id='firstName'
                  label='First Name'
                  autoFocus={true}
                />
              </Grid>

              <Grid item={true} xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required={true}
                  fullWidth={true}
                  id='lastName'
                  label='Last Name'
                  name='surname'
                  onChange={updateValue}
                  autoComplete='lname'
                />
              </Grid>

              <Grid item={true} xs={12}>
                <TextField
                  variant='outlined'
                  required={true}
                  fullWidth={true}
                  id='email'
                  label='Email Address'
                  name='email'
                  onChange={updateValue}
                  autoComplete='email'
                />
              </Grid>

              <Grid item={true} xs={12}>
                <TextField
                  variant='outlined'
                  required={true}
                  fullWidth={true}
                  name='password'
                  onChange={updateValue}
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>

            <Grid item={true} xs={12} className='recaptcha'>
              {recaptchaSiteKey ? (// render recaptcha only if Site Key is provided      
                  <GoogleReCaptcha onVerify={checkRecaptcha} />
              ) : (
                ''
              )}
            </Grid>

            <Button
              type='submit'
              fullWidth={true}
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={recaptchaSiteKey ? state.recaptchaValue ? false : true : false}>
              Sign Up
            </Button>

            <Grid container={true} justify='flex-end'>
              <Grid item={true}>
                <Link to='/login'>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </GoogleReCaptchaProvider>
  );

  return state.isRegistered ? <Redirect to={'/login'} /> : registrationPage;
};

export default Registration;

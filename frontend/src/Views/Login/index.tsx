import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../Context/auth-context';
import { NotificationsContext, Status } from '../../Context/notification-context';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  // use hook for state management
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const updateVlue = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // use user Context
  const auth = useAuth();
  const context = useContext(NotificationsContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    auth.login(form).then((res) => {
      if (!res) {
        return context.showNotification(
          'Can not connect to the sever, please check internet connection.',
          Status.error,
        );
      } else if (!res.user) {
        return context.showNotification('Can not log you in. Please check email and password.', Status.warning);
      }
    });
  };

  return (
    <Grid container={true} component='main' className={classes.root}>
      <CssBaseline />

      <Grid item={true} xs={false} sm={4} md={7} container={true} justify='center' alignItems='center'>
        <svg height='105' viewBox='0 0 349 105' width='349' className='sc-bsbRJL hRbJeB' data-test-id='logo'>
          <path
            d='M120.172 47.4793V6.3624h17.5506c4.8293 0 8.4219 1.214 10.7776 3.6418 1.7669 1.8404 2.6503 4.0725 2.6503 6.6961 0 4.4642-2.1791 7.636-6.5373 9.5157 5.8894 1.7621 8.8342 5.1102 8.8342 10.0442 0 3.4852-1.3546 6.2263-4.0637 8.2234-2.7092 1.9971-6.341 2.9957-10.8955 2.9957H120.172zm4.5938-22.7905h12.1911c2.8662 0 5.1631-.6462 6.8907-1.9384 1.7275-1.2922 2.5913-3.1327 2.5913-5.5214 0-2.0754-.8049-3.7005-2.4146-4.8753-1.5706-1.214-3.8086-1.8209-6.714-1.8209h-12.5445v14.156zm0 18.62h13.8402c3.141 0 5.6146-.646 7.4207-1.9383 1.8061-1.3314 2.7091-3.1719 2.7091-5.5214 0-2.2713-.9423-4.0138-2.8269-5.2278-1.8454-1.2139-4.5545-1.8208-8.1275-1.8208h-13.0156v14.5083zM162.6749 47.4793V6.3624h17.7273c5.0649 0 8.9716 1.3706 11.72 4.1117 2.1202 2.1146 3.1803 4.8557 3.1803 8.2233 0 3.2894-1.0209 5.9522-3.0625 7.9885-2.0417 2.0362-4.7509 3.3676-8.1275 3.9942l12.6623 16.7992h-5.7127l-11.9556-15.9769h-11.7789v15.977h-4.6527zm4.6527-20.1473h12.6623c3.141 0 5.6931-.7636 7.6563-2.2908 1.9631-1.5272 2.9447-3.6222 2.9447-6.285 0-2.5453-.9423-4.5229-2.8269-5.9326-1.8454-1.4489-4.4171-2.1733-7.7152-2.1733h-12.7212V27.332zM205.6476 47.4793V6.3624h4.6527v41.117h-4.6527zM233.27 47.4793v-36.829h-13.8401V6.3624h32.3921v4.288h-13.84v36.829h-4.712zM260.976 47.4793V6.3624h4.653v41.117h-4.653zM291.838 48.0667c-6.321 0-11.936-2.1929-16.844-6.5788l2.886-3.4068c2.199 1.9971 4.397 3.4656 6.596 4.4054 2.238.9398 4.751 1.4097 7.539 1.4097 2.748 0 4.966-.646 6.655-1.9383 1.688-1.3314 2.532-3.0544 2.532-5.169 0-1.997-.746-3.583-2.238-4.7578-1.492-1.1748-4.319-2.1929-8.481-3.0544-4.908-1.0573-8.441-2.4866-10.601-4.2879-2.159-1.8013-3.239-4.3663-3.239-7.6948 0-3.2501 1.276-5.9325 3.828-8.0471 2.552-2.1146 5.791-3.1719 9.718-3.1719 5.457 0 10.287 1.6838 14.488 5.0515l-2.709 3.583c-3.652-2.976-7.617-4.464-11.897-4.464-2.631 0-4.751.646-6.361 1.9383-1.609 1.2531-2.414 2.8586-2.414 4.8165 0 2.0363.765 3.6418 2.297 4.8166 1.57 1.1748 4.535 2.232 8.893 3.172 4.672 1.018 8.068 2.4473 10.188 4.2878 2.16 1.8013 3.24 4.288 3.24 7.4597 0 3.4852-1.316 6.3046-3.946 8.4584-2.631 2.1146-6.008 3.172-10.13 3.172zM315.375 47.4793V6.3624h4.653V24.63h23.793V6.3624h4.653v41.117h-4.653V28.9766h-23.793v18.5026h-4.653zM120.172 99.225V58.1081h15.4303c4.7116 0 8.4612 1.1748 11.2489 3.5243 2.7877 2.3496 4.1815 5.5606 4.1815 9.6331 0 4.2684-1.5509 7.5773-4.6527 9.9268-3.0625 2.3496-6.9102 3.5243-11.5433 3.5243h-10.012V99.225h-4.6527zm4.6527-18.7376h10.1887c3.4159 0 6.1447-.8223 8.1863-2.467 2.081-1.6838 3.1214-3.9159 3.1214-6.696 0-2.8587-1.0012-5.0516-3.0036-6.5788-1.9631-1.5664-4.6526-2.3496-8.0685-2.3496h-10.4243v18.0914zM159.5117 99.225V58.1081h29.8006v4.2292h-25.148v14.0385h22.4977v4.2291h-22.4977v14.391h25.4424v4.2291h-30.095zM195.4327 99.225L214.22 57.8144h4.3582L237.366 99.225h-5.006l-4.83-10.8666h-22.4386l-4.8883 10.8666h-4.7704zm11.4844-15.037h18.7869l-9.3638-20.9696-9.4231 20.9696zM245.495 99.225V58.1081h17.728c5.064 0 8.971 1.3706 11.72 4.1117 2.12 2.1146 3.18 4.8557 3.18 8.2234 0 3.2893-1.021 5.9521-3.063 7.9884-2.041 2.0363-4.751 3.3677-8.127 3.9942l12.662 16.7992h-5.713l-11.955-15.9768h-11.779V99.225h-4.653zm4.653-20.1473h12.662c3.141 0 5.693-.7636 7.657-2.2908 1.963-1.5272 2.944-3.6222 2.944-6.285 0-2.5453-.942-4.5228-2.827-5.9326-1.845-1.4488-4.417-2.1733-7.715-2.1733h-12.721v16.6817zM288.056 99.225V58.1081h4.652v36.829h23.205v4.288h-27.857z'
            fill='#3d3935'
          />
          <g clipPath='url(#clip0)'>
            <path
              d='M106.1708 52.5c0 28.9949-23.5671 52.5-52.6382 52.5C24.4616 105 .8948 81.4949.8948 52.5S24.4616 0 53.5326 0c29.071 0 52.6382 23.5051 52.6382 52.5z'
              fill='#e9c4a3'
            />
            <path
              d='M91.0022 38.7545C91.7236 17.6219 75.8515 2.1 54.2075 2.1c-21.6439 0-38.9415 17.5825-38.2376 36.6545.704 19.072 38.2376 64.1455 38.2376 64.1455s36.0732-43.013 36.7947-64.1455z'
              fill='#f0511b'
            />
            <path
              d='M73.6664 39.0384c0 10.9848-9.0443 19.8898-20.201 19.8898s-20.201-8.905-20.201-19.8898c0-10.9848 9.0443-19.8898 20.201-19.8898s20.201 8.905 20.201 19.8898z'
              fill='#fff'
            />
          </g>
          <defs>
            <clipPath id='clip0'>
              <path d='M0 0h105.276v105H0z' fill='#fff' transform='translate(.8948)' />
            </clipPath>
          </defs>
        </svg>
      </Grid>

      <Grid item={true} xs={12} sm={8} md={5} component={Paper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              onChange={updateVlue}
              required={true}
              fullWidth={true}
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus={true}
            />

            <TextField
              variant='outlined'
              margin='normal'
              onChange={updateVlue}
              required={true}
              fullWidth={true}
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button type='submit' fullWidth={true} variant='contained' color='primary' className={classes.submit}>
              Sign In
            </Button>
            <Grid container={true}>
              <Grid item={true}>
                <Link to='/registration'>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;

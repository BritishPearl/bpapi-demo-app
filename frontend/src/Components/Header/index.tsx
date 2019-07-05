import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../Context/auth-context';
import { useUser } from '../../Context/user-context';

interface HeaderProps {
  name?: string;
  logout: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(4),
    fontWeight: "bold",
  },
  grow: {
    flexGrow: 1,
  },
  routerLink: {
    textDecoration: 'none',
  },
  leftSpace: {
    marginLeft: theme.spacing(4),
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const auth = useAuth();
  const user = useUser();
  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <div className={classes.grow}>
            <Typography className={classes.menuButton} variant='button' align='center'>
              <Button>
                <RouterLink to={'/portfolio'} className={classes.routerLink}>Portfolio</RouterLink>
              </Button>
            </Typography>
          </div>

          <Typography className={classes.leftSpace}>
            <Button>
              <RouterLink to={'/profile'} className={classes.routerLink}>{user.data.name}</RouterLink>
            </Button>
          </Typography>

          <Button color='primary' onClick={auth.logout} className={classes.leftSpace}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

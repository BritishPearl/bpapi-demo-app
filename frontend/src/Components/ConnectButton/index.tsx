import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const ConnectButton: React.FC = () => {
  const classes = useStyles();
  const handleConnect = () => {
    const apiUrl = (window as any)._env_.BP_DEMO_API_URL;
    window.location.href = `${apiUrl}/britishpearl/authorize`;
  };

  return (
    <Button className={classes.button} onClick={handleConnect} variant='contained' color='primary'>
      Connect to BPAPI
    </Button>
  );
};

export default ConnectButton;

import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Client from '../../Utils/api-client';
import { NotificationsContext, Status } from '../../Context/notification-context';

interface Props {
  callback: (boolean: boolean) => void;
}

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

const DisconnectButton: React.FC<Props> = (props) => {
  const notification = useContext(NotificationsContext);
  const classes = useStyles();
  const handleDisconnect = () => {
    Client({ endpoint: 'britishpearl/revoke', method: 'GET' }).then((response) => {
      if (response.status < 400) {
        notification.showNotification('Your BP account was successfuly disconnected.', Status.success);
        props.callback(true);
      } else {
        notification.showNotification('Something went wrong, please try again later.', Status.error);
        props.callback(false);
      }
    });
  };

  return (
    <Button className={classes.button} onClick={handleDisconnect} variant='contained' color='secondary'>
      Disconnect account
    </Button>
  );
};

export default DisconnectButton;

import { IconButton, Snackbar } from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NotificationConsumer } from '../../Context/notification-context';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: '#16a085',
  },
  error: {
    backgroundColor: '#c0392b',
  },
  info: {
    backgroundColor: '#3498db',
  },
  warning: {
    backgroundColor: '#f39c12',
  },
}));

const NotificationBar = () => {
  const classes = useStyles();
  return (
    <NotificationConsumer>
      {({ notificationIsOpen, message, type, hideNotification }) => (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={notificationIsOpen}
          autoHideDuration={3000}
          onClose={hideNotification}>
          <SnackbarContent
            className={classes[type]}
            message={<span id='snackbar'>{message}</span>}
            action={[
              <IconButton key='close' color='inherit' onClick={hideNotification}>
                <Close />
              </IconButton>,
            ]}
          />
        </Snackbar>
      )}
    </NotificationConsumer>
  );
};

export default NotificationBar;

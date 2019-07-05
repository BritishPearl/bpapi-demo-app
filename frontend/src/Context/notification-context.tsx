import React, { Component } from 'react';
import NotificationBar from '../Components/NotificationBar';

interface State {
  isOpen: boolean;
  message: string;
  type: Status;
}

export enum Status {
    info='info',
    success='success',
    warning='warning',
    error='error',
}

const initialContext = {
  showNotification: (message: string, type: Status) => {},
  hideNotification: () => {},
  notificationIsOpen: false,
  message: '',
  type: Status.info,
};

export const NotificationsContext = React.createContext(initialContext);

export class NotificationsProvider extends Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      message: '',
      type: Status.info
    };
  }

  showNotification = (message: string, type: Status) => {
    this.setState({
      message,
      isOpen: true,
      type,
      
    });
  }

  hideNotification = () => {
    this.setState({
      message: '',
      isOpen: false,
      type: Status.info,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <NotificationsContext.Provider
        value={{
          showNotification: this.showNotification,
          hideNotification: this.hideNotification,
          notificationIsOpen: this.state.isOpen,
          message: this.state.message,
          type: this.state.type
        }}>
        <NotificationBar />
        {children}
      </NotificationsContext.Provider>
    );
  }
}

export const NotificationConsumer = NotificationsContext.Consumer;

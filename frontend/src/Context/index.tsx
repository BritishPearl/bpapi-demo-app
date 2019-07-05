import React from 'react';

import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';
import { NotificationsProvider } from './notification-context';

// define provider App Provider
const AppProviders = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;

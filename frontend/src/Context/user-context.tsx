import React from 'react';

import { useAuth } from './auth-context';

export interface User {
  data: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    accountTypes: [];
  };
}

const initialUserData: User = {
  data: {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    accountTypes: [],
  },
};
const UserContext: React.Context<User> = React.createContext(initialUserData);

// define provider
const UserProvider = (props: any) => {
  const {
    data: { user },
  } = useAuth();
  return <UserContext.Provider value={user} {...props} />;
};

// define useUser hook
const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

export { UserProvider, useUser };

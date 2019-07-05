import React from 'react';
import { useAsync } from 'react-async';
import { bootstrapAppData } from '../Utils/bootstrap';
import * as authClient from '../Utils/auth-client';
import FullPageSpinner from '../Components/FullPageSpinner';

interface Form {
  email: string;
  password: string;
}

interface User {
  token: string;
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface Data {
  user: User | null;
}

interface AuthContext {
  data: Data;
  login: (form: Form) => Promise<any>;
  logout: () => Promise<void>;
  register: (form: Form, recaptcha: string | null) => Promise<number>;
}

// initial context
const initialContext: AuthContext = {
  data: { user: null },
  login: () => Promise.resolve(undefined),
  logout: () => Promise.resolve(undefined),
  register: () => Promise.resolve(0),
};

// define context
const AuthContext: React.Context<AuthContext> = React.createContext(initialContext);

// define context provider
const AuthProvider = (props: any) => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  // get initial data
  const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
    promiseFn: bootstrapAppData,
  });

  // handle state change
  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    // show spinner if pending
    if (isPending) {
      return <FullPageSpinner />;
    }
    // show error message if any
    if (isRejected) {
      return (
        <div className='error'>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error ? error.message : ''}</pre>
        </div>
      );
    }
  }

  // define login method
  const login: (form: Form) => Promise<any> = (form) => authClient.login(form).then(reload);
  // define registration method
  const register: (form: any, recaptcha: string | null) => Promise<number> = (form, recaptcha) =>
    authClient.register(form, recaptcha);
  // define logout method
  const logout: () => Promise<void> = () => authClient.logout().then(reload);

  // return context
  return <AuthContext.Provider value={{ data, login, logout, register }} {...props} />;
};

// define useAuth hook
const useAuth: () => AuthContext = () => {
  const context: AuthContext = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

// return context and hook
export { AuthProvider, useAuth };

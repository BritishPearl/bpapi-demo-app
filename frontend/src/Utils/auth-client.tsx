import client from './api-client';

interface User {
  user: {
    token: string;
    id: number;
  } | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface UpdateData {
  id?: number;
  data: {
    name?: string;
    surname?: string;
    email?: string;
  };
}

// define token storage name
const localStorageKey = '__DEMO_APP_token__';

// login response hanler adds token to localstorage
const handleLoginResponse: (par: any) => User | false = (response) => {
  if (response.status === 200 && response.body.token) {
    window.localStorage.setItem(localStorageKey, response.body.token);
    return { user: { token: response.body.token, ...response.body } };
  }
  return response.status === 500 ? false : { user: null };
};

// register response hanler
const handleRegisterResponse: (par: any) => number = (response) => {
  return response.status;
};

// returns user info
const getUser: () => Promise<any> = () => {
  const token: string | null = getToken();
  // return null if do not have a token
  if (!token) {
    return Promise.resolve(null);
  }
  // return user info
  return client({ endpoint: 'user/me', method: 'GET' }).then(response => {
    if (response.status === 401) {logout();}
    return response;
  }).catch((error: Error) => {
    logout();
    return Promise.reject(error);
  });
};
// register function
const update: (data: UpdateData) => Promise<any> = (data: UpdateData) => {
  const token: string | null = getToken();
  // return null if do not have a token
  if (!token) {
    return Promise.resolve(null);
  }
  return client({ endpoint: 'user/me', method: 'PATCH', body: { ...data } });
};

// login function
const login: (data: LoginData) => Promise<User | false> = ({ email, password }: LoginData) => {
  return client({ endpoint: 'login', method: 'POST', body: { email, password } }).then(handleLoginResponse);
};

// register function
const register: (data: RegData, recaptcha: string | null) => Promise<any> = (
  data: RegData,
  recaptcha: string | null,
) => {
  return client({ endpoint: 'user', method: 'POST', body: { ...data, recaptcha } }).then(handleRegisterResponse);
};

// logout function
const logout: () => Promise<any> = () => {
  window.localStorage.removeItem(localStorageKey);
  return Promise.resolve();
};

// retrives token from the localstorage
const getToken: () => string | null = () => {
  return window.localStorage.getItem(localStorageKey);
};

export { login, register, update, logout, getToken, getUser };

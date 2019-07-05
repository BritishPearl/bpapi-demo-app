interface Config {
  endpoint: string;
  method: string;
  body?: {
    id?: number;
    email?: string;
    password?: string;
    recaptcha?: string | null;
  };
  proxy?: string | undefined;
  customConfig?: string[];
}

interface CustomConfig {
  method: string;
  body?: string;
  headers: Record<string, string>;
}

// returns fetch data promise
const client: (conf: Config) => Promise<any> = async (requestConfig: Config) => {
  const { endpoint, method, body } = requestConfig;
  // trying to find token in data storage
  const token = window.localStorage.getItem('__DEMO_APP_token__');
  // set headers
  const headers = { 'content-type': 'application/json', 'Authorization': '' };
  // set token if exist
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // custom configuration
  const config: CustomConfig = {
    method,
    // ...customConfig,
    headers: {
      ...headers,
      // ...customConfig.headers,
    },
  };
  // prepare body if provided
  if (body) {
    config.body = JSON.stringify(body);
  }
  // make request
  const apiUrl = (window as any)._env_.BP_DEMO_API_URL || 'http://localhost:3001/api';
  let respondStatus: any;
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then((response) => {
      respondStatus = response.status;
      return response.status > 300 ? null : response.json();
    })
    .then((data) => {
      return { status: respondStatus, body: data };
    })
    .catch((err) => {
      return { status: 500, body: err.message };
    });
};

export default client;

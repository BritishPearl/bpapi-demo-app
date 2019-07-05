import { getUser } from './auth-client';

const bootstrapAppData = async () => {
  const data = await getUser();
  if (!data) {
    return { user: null };
  }
  const user = { data: data.body };
  return {
    user,
  };
};

export { bootstrapAppData };

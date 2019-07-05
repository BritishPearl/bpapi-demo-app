import React from 'react';

import { useUser, User } from './Context/user-context';
import FullPageSpinner from './Components/FullPageSpinner';

const loadProtectedRoutes: () => Promise<any> = () => import('./Routes/protectedRoutes');
/* tslint:disable:variable-name */
const ProtectedRoutes: React.LazyExoticComponent<any> = React.lazy(loadProtectedRoutes);
const OpenRoutes: React.LazyExoticComponent<any> = React.lazy(() => import('./Routes/openRoutes'));

const App = () => {
  const user: User = useUser();
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadProtectedRoutes();
  }, []);
  return <React.Suspense fallback={<FullPageSpinner />}>{user ? <ProtectedRoutes /> : <OpenRoutes />}</React.Suspense>;
}

export default App;

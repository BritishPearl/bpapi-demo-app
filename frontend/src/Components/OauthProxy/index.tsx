import React, { useContext, useEffect } from 'react';
import FullPageSpinner from '../FullPageSpinner';
import client from '../../Utils/api-client';
import { logout } from '../../Utils/auth-client';
import { NotificationsContext, Status } from '../../Context/notification-context';

const OauthProxy = () => {
  const context = useContext(NotificationsContext);
  useEffect(() => {
    const proxyRequest = async () => {
      const originalUrl = window.location.href;
      const params = `${window.location.search}&url=${originalUrl}`;
      const endpoint = `britishpearl/callback${params}`;

      client({ endpoint, method: 'GET' })
        .then((response) => {
          if (response.status > 399) {
            context.showNotification('Something went wrong :/', Status.error);
          }
          window.location.pathname = '/portfolio';
        })
        .catch((error: Error) => {
          logout();
          return Promise.reject(error);
        });
    };

    proxyRequest();
  }, []);

  return <FullPageSpinner />;
};

export default OauthProxy;

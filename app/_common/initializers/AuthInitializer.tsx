'use client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LoadingPage from '../components/Page/LoadingPage';

const AuthRedirect = ({
  children,
  accessToken,
  setAccessToken,
}: {
  children: React.ReactNode;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}) => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  useEffect(() => {
    const getUserAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setAccessToken(accessToken);
    };

    if (!isLoading && isAuthenticated) {
      getUserAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken) {
        getAccessTokenSilently()
          .then((newToken) => {
            if (newToken !== accessToken) {
              console.log('access token changed', newToken);
              setAccessToken(newToken);
            }
          })
          .catch((error) => {
            console.error('Failed to get new access token', error);
            logout();
          });
      } else {
        console.log('not authenticated');
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [getAccessTokenSilently, accessToken, setAccessToken, logout]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
    return <div></div>;
  }

  return <>{children}</>;
};

const AuthInitializer = ({
  children,
  accessToken,
  setAccessToken,
}: {
  children: React.ReactNode;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}) => {
  const [redirectUrl, setRedirectUrl] = useState<string>();

  useEffect(() => {
    setRedirectUrl(window.location.origin);
  }, []);

  if (!redirectUrl) {
    return <LoadingPage />;
  }

  return (
    <Auth0Provider
      domain="dev--hkrho7z.us.auth0.com"
      clientId="Fdx5o2wEpWgjgpbWeUwc9ZVMFn2eZsxR"
      authorizationParams={{
        redirect_uri: redirectUrl,
        audience: 'https://dev--hkrho7z.us.auth0.com/api/v2/',
        scope: 'profile',
      }}
    >
      <AuthRedirect setAccessToken={setAccessToken} accessToken={accessToken}>
        {children}
      </AuthRedirect>
    </Auth0Provider>
  );
};

export default AuthInitializer;

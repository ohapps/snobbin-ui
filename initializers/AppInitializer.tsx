'use client';

import { useState } from 'react';
import AlertInitializer from './AlertInitializer';
import ApolloInitializer from './ApolloInitializer';
import AuthInitializer from './AuthInitializer';
import ThemeInitializer from './ThemeInitializer';

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState('');
  return (
    <ThemeInitializer>
      <AuthInitializer
        setAccessToken={setAccessToken}
        accessToken={accessToken}
      >
        <ApolloInitializer accessToken={accessToken}>
          <AlertInitializer>{children}</AlertInitializer>
        </ApolloInitializer>
      </AuthInitializer>
    </ThemeInitializer>
  );
};

export default AppInitializer;

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppInitializer from '../initializers/AppInitializer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HeaderBar from '../components/Header/HeaderBar';
import PageContainer from '../components/Page/PageContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snobbin - v1.0.2',
  description: 'Snobbin is a group ranking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppInitializer>
          <HeaderBar />
          <PageContainer>{children}</PageContainer>
        </AppInitializer>
      </body>
    </html>
  );
}

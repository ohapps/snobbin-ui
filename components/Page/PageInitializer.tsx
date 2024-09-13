import { ApolloError } from '@apollo/client';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  error?: string | ApolloError;
}

const PageInitializer = ({ children, loading = false, error }: Props) => {
  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <ErrorPage
        message={error instanceof ApolloError ? error?.message : error}
      />
    );
  }

  return <>{children}</>;
};

export default PageInitializer;

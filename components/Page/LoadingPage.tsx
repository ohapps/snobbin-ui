import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: theme.spacing(12),
}));

const LoadingPage = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default LoadingPage;

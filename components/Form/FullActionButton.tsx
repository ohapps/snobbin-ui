import { LoadingButton } from '@mui/lab';
import { Box, styled } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  maxWidth: theme.spacing(50),
}));

const FullActionButton = ({
  children,
  loading = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <Container>
      <StyledButton
        variant="contained"
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        fullWidth
      >
        {children}
      </StyledButton>
    </Container>
  );
};

export default FullActionButton;

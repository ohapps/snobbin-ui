import PageBackButton from '@/app/_common/components/Page/PageBackButton';
import { Box, styled } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const GroupDetailsHeader = () => {
  return (
    <Container>
      <PageBackButton title="Back To My Groups" backUrl="/groups" />
    </Container>
  );
};

export default GroupDetailsHeader;

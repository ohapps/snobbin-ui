import { Button, styled } from '@mui/material';
import PageTitle from '../Page/PageTitle';
import { defaultNewGroup } from '../../types/group';
import { selectedGroup } from '@/apollo/reactiveVariables';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const NewGroupButton = styled(Button)(({ theme }) => ({
  fontSize: 12,
  height: '40px',
}));

const GroupHeader = () => {
  const newGroup = () => {
    selectedGroup(defaultNewGroup);
  };

  return (
    <Container>
      <PageTitle title="My Groups" />
      <NewGroupButton variant="contained" size="small" onClick={newGroup}>
        New Group
      </NewGroupButton>
    </Container>
  );
};

export default GroupHeader;

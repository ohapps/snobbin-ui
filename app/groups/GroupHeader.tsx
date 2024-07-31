import { Button, styled } from '@mui/material';
import PageTitle from '../_common/components/Page/PageTitle';
import { selectedGroup } from '../_common/apollo/reactiveVariables';
import { defaultNewGroup } from '../_common/types/group';

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

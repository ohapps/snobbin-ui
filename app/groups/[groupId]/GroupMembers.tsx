import { Group } from '@/app/_common/types/group';
import { getSnobIdentifier } from '@/app/_common/utils/snobUtils';
import { Box, Divider, Typography, styled } from '@mui/material';
import GroupInvites from './GroupInvites';

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  paddingTop: theme.spacing(1),
}));

export const Text = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

const GroupMembers = ({ group }: { group: Group }) => {
  return (
    <Box p={2}>
      <Divider />
      <Title>Group Members ({group.groupMembers.length})</Title>
      {group.groupMembers.map((member) => (
        <Text key={member.snobId}>{getSnobIdentifier(member.snob)}</Text>
      ))}
      <GroupInvites group={group} />
    </Box>
  );
};

export default GroupMembers;

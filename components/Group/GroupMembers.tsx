import { Group } from '@/types/group';
import { getSnobIdentifier } from '@/utils/snobUtils';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
  styled,
} from '@mui/material';
import GroupInvites from './GroupInvites';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';

export const Text = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const GroupMembers = ({ group }: { group: Group }) => {
  return (
    <Box p={2}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Group Members ({group.groupMembers.length})
        </AccordionSummary>
        <AccordionDetails>
          {group.groupMembers.map((member) => (
            <Box key={member.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 30, height: 30 }}>
                <PersonIcon />
              </Avatar>
              <Text key={member.snobId}>{getSnobIdentifier(member.snob)}</Text>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <GroupInvites group={group} />
    </Box>
  );
};

export default GroupMembers;

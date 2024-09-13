import { Group, InviteStatus } from '@/types/group';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField as MuiTextField,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP_INVITE } from '@/graphql/mutations';
import { MY_GROUPS } from '@/graphql/queries';
import { useSnackbar } from 'notistack';
import GroupInviteItem from './GroupInviteItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  paddingTop: theme.spacing(1),
}));

export const Text = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

export const TextField = styled(MuiTextField)(({ theme }) => ({
  paddingTop: theme.spacing(0.5),
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.common.white,
  },
}));

export const InviteContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const GroupInvites = ({ group }: { group: Group }) => {
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [createGroupInvite, { loading }] = useMutation(CREATE_GROUP_INVITE);

  const pendingInvites = group.groupInvites.filter(
    (invite) => invite.status === InviteStatus.PENDING
  );

  const sendInvite = () => {
    createGroupInvite({
      variables: {
        groupId: group.id,
        email,
      },
      refetchQueries: [MY_GROUPS],
      onCompleted: () => {
        enqueueSnackbar('Invite sent successfully', {
          variant: 'success',
        });
        setEmail('');
      },
      onError: () => {
        enqueueSnackbar('Failed to send invite', { variant: 'error' });
      },
    });
  };

  return (
    <Box pt={2}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Pending Invites ({pendingInvites.length})
        </AccordionSummary>
        <AccordionDetails>
          {pendingInvites.map((invite) => (
            <GroupInviteItem key={invite.id} invite={invite} />
          ))}
          <TextField
            placeholder="enter email to invite"
            fullWidth
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={sendInvite} disabled={!email || loading}>
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default GroupInvites;

import { Group, InviteStatus } from '@/app/_common/types/group';
import {
  Box,
  Divider,
  IconButton,
  TextField as MuiTextField,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP_INVITE } from '@/app/_common/graphql/mutations';
import { MY_GROUPS } from '@/app/_common/graphql/queries';
import { useSnackbar } from 'notistack';
import GroupInvite from './GroupInvite';

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
      <Divider />
      <Title>Pending Invites ({pendingInvites.length})</Title>
      {pendingInvites.map((invite) => (
        <GroupInvite key={invite.id} invite={invite} />
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
    </Box>
  );
};

export default GroupInvites;

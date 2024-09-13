import {
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { GroupInvite } from '../../types/group';
import AcceptIcon from '@mui/icons-material/Check';
import RejectIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { ACCEPT_GROUP_INVITE } from '../../graphql/mutations';
import { useSnackbar } from 'notistack';
import { PENDING_GROUP_INVITES } from '../../graphql/queries';

const PendingInvite = ({ invite }: { invite: GroupInvite }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [acceptGroupInvite, { loading: acceptLoading }] =
    useMutation(ACCEPT_GROUP_INVITE);

  const acceptInvite = () => {
    acceptGroupInvite({
      variables: {
        id: invite.id,
      },
      refetchQueries: [PENDING_GROUP_INVITES],
      onCompleted: () => {
        enqueueSnackbar('Invite accepted successfully', {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar('Failed to accept invite', { variant: 'error' });
      },
    });
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="decline">
          <RejectIcon />
        </IconButton>
      }
    >
      <ListItemAvatar sx={{ mr: 2 }}>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AcceptIcon />}
          disabled={acceptLoading}
          onClick={acceptInvite}
        >
          ACCEPT
        </Button>
      </ListItemAvatar>
      <ListItemText>
        <Typography>{invite?.group?.name}</Typography>
      </ListItemText>
    </ListItem>
  );
};

export default PendingInvite;

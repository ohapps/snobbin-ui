import { GroupInvite as GroupInviteItem } from '@/types/group';
import { DELETE_GROUP_INVITE } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { Avatar, Box, IconButton, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import { MY_GROUPS } from '@/graphql/queries';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

export const InviteContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Text = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const GroupInviteItem = ({ invite }: { invite: GroupInviteItem }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteGroupInvite, { loading }] = useMutation(DELETE_GROUP_INVITE);
  const [modalOpen, setModalOpen] = useState(false);

  const deleteInvite = () => {
    deleteGroupInvite({
      variables: {
        id: invite.id,
      },
      refetchQueries: [MY_GROUPS],
      onCompleted: () => {
        enqueueSnackbar('Invite deleted successfully', {
          variant: 'success',
        });
        setModalOpen(false);
      },
      onError: () => {
        enqueueSnackbar('Failed to delete invite', { variant: 'error' });
      },
    });
  };

  return (
    <>
      <InviteContainer>
        <Avatar sx={{ width: 30, height: 30 }}>
          <PersonIcon />
        </Avatar>
        <Text>{invite.email}</Text>
        <IconButton onClick={() => setModalOpen(true)} disabled={loading}>
          <DeleteIcon />
        </IconButton>
      </InviteContainer>
      <ConfirmModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={deleteInvite}
        title="Are you sure you want to delete this invite?"
        loading={loading}
      />
    </>
  );
};

export default GroupInviteItem;

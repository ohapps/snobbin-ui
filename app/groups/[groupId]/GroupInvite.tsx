import { GroupInvite } from '@/app/_common/types/group';
import { DELETE_GROUP_INVITE } from '@/app/_common/graphql/mutations';
import { useMutation } from '@apollo/client';
import { Box, IconButton, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import { MY_GROUPS } from '@/app/_common/graphql/queries';
import ConfirmModal from '@/app/_common/components/Modal/ConfirmModal';
import { useState } from 'react';

export const InviteContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Text = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

const GroupInvite = ({ invite }: { invite: GroupInvite }) => {
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

export default GroupInvite;

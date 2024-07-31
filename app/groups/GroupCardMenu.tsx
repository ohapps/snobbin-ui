import {
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  styled,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Group } from '../_common/types/group';
import { selectedGroup } from '../_common/apollo/reactiveVariables';
import { useMutation } from '@apollo/client';
import { DELETE_RANKING_GROUP } from '../_common/graphql/mutations';
import { MY_GROUPS } from '../_common/graphql/queries';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    minWidth: theme.spacing(20),
  },
}));

const GroupCardMenu = ({ group }: { group: Group }) => {
  const [deleteRankingGroup, { loading }] = useMutation(DELETE_RANKING_GROUP);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    selectedGroup(group);
    handleClose();
  };

  const closeConfirm = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(true);
    handleClose();
  };

  const handleDelete = () => {
    deleteRankingGroup({
      variables: {
        id: group.id,
      },
      refetchQueries: [MY_GROUPS],
      onCompleted: () => {
        enqueueSnackbar('Group deleted successfully', { variant: 'success' });
        closeConfirm();
      },
      onError: () => {
        enqueueSnackbar('Failed to delete group', { variant: 'error' });
        closeConfirm();
      },
    });
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="group-edit-button"
        aria-controls={open ? 'group-edit-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="group-edit-menu"
        MenuListProps={{
          'aria-labelledby': 'group-edit-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit Group</MenuItem>
        <MenuItem onClick={handleConfirmDelete}>Delete Group</MenuItem>
      </Menu>
      <Dialog open={showDeleteConfirm} onClose={closeConfirm}>
        <DialogTitle>Are you sure you want to delete this group?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirm}>Cancel</Button>
          <LoadingButton
            onClick={handleDelete}
            variant="contained"
            loading={loading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupCardMenu;

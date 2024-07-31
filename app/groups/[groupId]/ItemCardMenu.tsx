import {
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  styled,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { RankingItem } from '@/app/_common/types/group';
import { editingRankingItem } from '@/app/_common/apollo/reactiveVariables';
import { LoadingButton } from '@mui/lab';
import { MY_GROUPS } from '@/app/_common/graphql/queries';
import { useSnackbar } from 'notistack';
import { DELETE_RANKING_ITEM } from '@/app/_common/graphql/mutations';
import { useMutation } from '@apollo/client';

const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    minWidth: theme.spacing(20),
  },
}));

const Container = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const ItemCardMenu = ({ item }: { item: RankingItem }) => {
  const [deleteRankingItem, { loading }] = useMutation(DELETE_RANKING_ITEM);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    editingRankingItem(item);
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
    deleteRankingItem({
      variables: {
        id: item.id,
      },
      refetchQueries: [MY_GROUPS],
      onCompleted: () => {
        enqueueSnackbar('Item deleted successfully', { variant: 'success' });
        closeConfirm();
      },
      onError: () => {
        enqueueSnackbar('Failed to delete item', { variant: 'error' });
        closeConfirm();
      },
    });
  };

  return (
    <Container>
      <IconButton
        aria-label="more"
        id="item-edit-button"
        aria-controls={open ? 'item-edit-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="item-edit-menu"
        MenuListProps={{
          'aria-labelledby': 'item-edit-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit Item</MenuItem>
        <MenuItem onClick={handleConfirmDelete}>Delete Item</MenuItem>
      </Menu>
      <Dialog open={showDeleteConfirm} onClose={closeConfirm}>
        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
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
    </Container>
  );
};

export default ItemCardMenu;

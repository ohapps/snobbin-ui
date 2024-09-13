import { RankingItemSortDirection, RankingItemSoryBy } from '@/types/group';
import { enumToDisplay } from '@/utils/misc';
import { Chip, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const ItemListSort = ({
  total,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: {
  total: number;
  sortBy: RankingItemSoryBy;
  setSortBy: (value: RankingItemSoryBy) => void;
  sortDirection: RankingItemSortDirection;
  setSortDirection: (value: RankingItemSortDirection) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    sortBy: RankingItemSoryBy,
    sortDirection: RankingItemSortDirection
  ) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    setAnchorEl(null);
  };

  return (
    <div>
      <Chip
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: '16px' }}
        label={`${total.toLocaleString()} items sorted by ${enumToDisplay(
          sortBy
        )} ${enumToDisplay(sortDirection)}`}
      />
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(sortBy, sortDirection)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() =>
            handleClose(
              RankingItemSoryBy.DESCRIPTION,
              RankingItemSortDirection.ASC
            )
          }
        >
          sort by description asc
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClose(
              RankingItemSoryBy.DESCRIPTION,
              RankingItemSortDirection.DESC
            )
          }
        >
          sort by description desc
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClose(
              RankingItemSoryBy.AVERAGE_RANKING,
              RankingItemSortDirection.ASC
            )
          }
        >
          sort by average ranking asc
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClose(
              RankingItemSoryBy.AVERAGE_RANKING,
              RankingItemSortDirection.DESC
            )
          }
        >
          sort by average ranking desc
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ItemListSort;

import {
  Group,
  RankingItemSortDirection,
  RankingItemSoryBy,
  defaultNewRankingItem,
} from '@/types/group';
import { Box, Button, Grid, Pagination, styled } from '@mui/material';
import SearchBox from '@/components/Header/SearchBox';
import { useState } from 'react';
import ItemListPage from './ItemListPage';
import { editingRankingItem } from '@/apollo/reactiveVariables';
import ItemListSort from './ItemListSort';

const NewItemButton = styled(Button)(({ theme }) => ({
  fontSize: 12,
  height: '40px',
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
}));

const ItemList = ({ group }: { group: Group }) => {
  const [keyword, setKeyword] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(RankingItemSoryBy.AVERAGE_RANKING);
  const [sortDirection, setSortDirection] = useState(
    RankingItemSortDirection.DESC
  );
  const limit = 25;
  const pages = Math.ceil(total / limit);

  const newItem = () => {
    editingRankingItem(defaultNewRankingItem);
  };

  return (
    <Box>
      <Grid container>
        <Grid item md={6} xs={12} display={'flex'} alignItems={'center'}>
          <ItemListSort
            total={total}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          display={'flex'}
          paddingBottom={2}
          justifyContent={'flex-end'}
        >
          <SearchBox keyword={keyword} setKeyword={setKeyword} />
          <NewItemButton variant="contained" size="small" onClick={newItem}>
            New Item
          </NewItemButton>
        </Grid>
      </Grid>
      <ItemListPage
        group={group}
        keyword={keyword}
        setTotal={setTotal}
        page={page - 1}
        limit={limit}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      <PaginationContainer>
        <Pagination
          count={pages}
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </PaginationContainer>
    </Box>
  );
};

export default ItemList;

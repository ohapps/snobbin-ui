import { Group, defaultNewRankingItem } from '@/app/_common/types/group';
import {
  Box,
  Button,
  Grid,
  Pagination,
  Typography,
  styled,
} from '@mui/material';
import { editingRankingItem } from '@/app/_common/apollo/reactiveVariables';
import SearchBox from '@/app/_common/components/Header/SearchBox';
import { useState } from 'react';
import ItemListPage from './ItemListPage';

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
  const limit = 25;
  const pages = Math.ceil(total / limit);

  const newItem = () => {
    editingRankingItem(defaultNewRankingItem);
  };

  return (
    <Box>
      <Grid container>
        <Grid item md={6} xs={12} display={'flex'} alignItems={'center'}>
          <Typography>{total} items</Typography>
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

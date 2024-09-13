import LoadingPage from '@/components/Page/LoadingPage';
import { SEARCH_RANKING_ITEMS } from '@/graphql/queries';
import {
  Group,
  RankingItemSearchResult,
  RankingItemSortDirection,
  RankingItemSoryBy,
} from '@/types/group';
import { useQuery } from '@apollo/client';
import ItemCard from './ItemCard';
import { Stack } from '@mui/material';

const ItemListPage = ({
  group,
  keyword,
  setTotal,
  page,
  limit,
  sortBy,
  sortDirection,
}: {
  group: Group;
  keyword: string;
  setTotal: (value: number) => void;
  page: number;
  limit: number;
  sortBy: RankingItemSoryBy;
  sortDirection: RankingItemSortDirection;
}) => {
  const { loading, data } = useQuery<RankingItemSearchResult>(
    SEARCH_RANKING_ITEMS,
    {
      variables: {
        groupId: group.id,
        keyword,
        page,
        limit,
        sort: sortBy,
        dir: sortDirection,
      },
      onCompleted: (data) => {
        setTotal(data.searchRankingItems.total);
      },
    }
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Stack spacing={2}>
      {data?.searchRankingItems.items.map((item) => (
        <ItemCard key={item.id} group={group} item={item} />
      ))}
    </Stack>
  );
};

export default ItemListPage;

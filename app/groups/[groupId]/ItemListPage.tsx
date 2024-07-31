import LoadingPage from '@/app/_common/components/Page/LoadingPage';
import { SEARCH_RANKING_ITEMS } from '@/app/_common/graphql/queries';
import { Group, RankingItemSearchResult } from '@/app/_common/types/group';
import { useQuery } from '@apollo/client';
import ItemCard from './ItemCard';
import { Stack } from '@mui/material';

const ItemListPage = ({
  group,
  keyword,
  setTotal,
  page,
  limit,
}: {
  group: Group;
  keyword: string;
  setTotal: (value: number) => void;
  page: number;
  limit: number;
}) => {
  const { loading, data } = useQuery<RankingItemSearchResult>(
    SEARCH_RANKING_ITEMS,
    {
      variables: {
        groupId: group.id,
        keyword,
        page,
        limit,
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

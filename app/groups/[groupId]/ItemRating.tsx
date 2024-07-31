import { Group, RankingItem } from '@/app/_common/types/group';
import { Rating, Typography, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
}));

export const AverageText = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

export const PendingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

const ItemRating = ({ group, item }: { group: Group; item: RankingItem }) => {
  return (
    <Container>
      {item.ranked ? (
        <>
          <Rating
            value={item.averageRanking}
            precision={group.increments}
            max={group.maxRanking}
            readOnly
          />
          <AverageText>({item.averageRanking} avg)</AverageText>
        </>
      ) : (
        <PendingText>Rank Pending</PendingText>
      )}
    </Container>
  );
};

export default ItemRating;

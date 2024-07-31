import { Group, RankingItem } from '@/app/_common/types/group';
import { Box, Grid, Card as MuiCard, Typography, styled } from '@mui/material';
import ItemRating from './ItemRating';
import { useReactiveVar } from '@apollo/client';
import { selectedRankingItem } from '@/app/_common/apollo/reactiveVariables';
import ItemRankings from './ItemRankings';

export const Card = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ':hover': {
    backgroundColor: theme.palette.grey[300],
    cursor: 'pointer',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export const AttributeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const AttributeLabel = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  paddingRight: theme.spacing(1),
}));

const ItemCard = ({ group, item }: { group: Group; item: RankingItem }) => {
  const selectedItem = useReactiveVar(selectedRankingItem);

  const toggleRankings = () => {
    selectedRankingItem(item);
  };

  const getAttributeValue = (id: string) => {
    return (
      item.attributes?.find((attr) => attr.attributeId === id)
        ?.attributeValue ?? ''
    );
  };

  return (
    <Card onClick={toggleRankings}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Title>{item.description}</Title>
        </Grid>
        <Grid item xs={12} md={6}>
          <ItemRating group={group} item={item} />
        </Grid>
        <Grid item xs={12}>
          {group.attributes?.map((attr) => (
            <AttributeContainer key={attr.id}>
              <AttributeLabel>{attr.name}</AttributeLabel>{' '}
              {getAttributeValue(attr.id)}
            </AttributeContainer>
          ))}
        </Grid>
        {selectedItem?.id === item.id && (
          <Grid item xs={12}>
            <ItemRankings group={group} item={item} />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ItemCard;

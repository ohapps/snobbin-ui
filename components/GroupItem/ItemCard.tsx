import { Group, RankingItem, Role } from '@/types/group';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Card as MuiCard,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import ItemRating from './ItemRating';
import ItemRankings from './ItemRankings';
import Image from 'next/image';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useCurrentGroupMember from '@/hooks/useCurrentGroupMember';
import ItemCardMenu from './ItemCardMenu';

export const Card = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.h6.fontSize,
}));

export const AttributeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AttributeLabel = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  paddingTop: theme.spacing(1),
}));

export const AttributeValue = styled(Box)(({ theme }) => ({
  minHeight: theme.spacing(1),
}));

const ItemCard = ({ group, item }: { group: Group; item: RankingItem }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const groupMember = useCurrentGroupMember(group);

  const getAttributeValue = (id: string) => {
    return (
      item.attributes?.find((attr) => attr.attributeId === id)
        ?.attributeValue ?? ''
    );
  };

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '-10px',
            marginBottom: '-40px',
          }}
        >
          {groupMember?.role === Role.ADMIN && <ItemCardMenu item={item} />}
        </Grid>
        <Grid item xs={12} md={6}>
          <Title>{item.description}</Title>
          <Image
            width={125}
            height={125}
            src="/beer_placeholder.jpg"
            alt="item image placeholder"
            style={{ border: `1px solid ${theme.palette.grey[400]}` }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ItemRating group={group} item={item} />
          {group.attributes?.map((attr) => (
            <AttributeContainer key={attr.id}>
              <AttributeLabel>{attr.name}</AttributeLabel>
              <AttributeValue>{getAttributeValue(attr.id)}</AttributeValue>
            </AttributeContainer>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Rankings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded && <ItemRankings group={group} item={item} />}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ItemCard;

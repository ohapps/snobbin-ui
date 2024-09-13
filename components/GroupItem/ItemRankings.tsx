import { Group, RankingItem, Rankings, Role } from '@/types/group';
import ItemCardMenu from './ItemCardMenu';
import { Divider, Grid, Rating, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { MY_GROUPS, RANKING_ITEMS } from '@/graphql/queries';
import useCurrentGroupMember from '@/hooks/useCurrentGroupMember';
import LoadingPage from '@/components/Page/LoadingPage';
import { useEffect, useState } from 'react';
import { CREATE_RANKING, UPDATE_RANKING } from '@/graphql/mutations';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import OtherRanking from './OtherRanking';

const ItemRankings = ({ group, item }: { group: Group; item: RankingItem }) => {
  const { enqueueSnackbar } = useSnackbar();
  const groupMember = useCurrentGroupMember(group);
  const { loading, data } = useQuery<Rankings>(RANKING_ITEMS, {
    variables: { itemId: item.id },
  });
  const [createRanking, { loading: createLoading }] =
    useMutation(CREATE_RANKING);
  const [updateRanking, { loading: updateLoading }] =
    useMutation(UPDATE_RANKING);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const currentRanking = data?.getRankings.find(
    (ranking) => ranking.groupMemberId === groupMember?.id
  );

  const otherRankings = data?.getRankings.filter(
    (ranking) => ranking.groupMemberId !== groupMember?.id
  );

  const isValid = rating > 0 && rating <= group.maxRanking;

  useEffect(() => {
    if (currentRanking) {
      setRating(currentRanking?.rank ?? 0);
      setNotes(currentRanking?.notes ?? '');
    }
  }, [currentRanking]);

  const onCompleted = () => {
    enqueueSnackbar('Ranking saved successfully', { variant: 'success' });
  };

  const onError = () => {
    enqueueSnackbar('Failed to save ranking', { variant: 'error' });
  };

  const saveRanking = () => {
    if (currentRanking) {
      updateRanking({
        variables: {
          id: currentRanking.id,
          rank: rating,
          notes,
        },
        refetchQueries: [MY_GROUPS, RANKING_ITEMS],
        onCompleted,
        onError,
      });
    } else {
      createRanking({
        variables: {
          itemId: item.id,
          rank: rating,
          notes,
        },
        refetchQueries: [MY_GROUPS, RANKING_ITEMS],
        onCompleted,
        onError,
      });
    }
  };

  if (!groupMember || loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Your Ranking</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <Rating
            value={rating}
            precision={group.increments}
            max={group.maxRanking}
            onChange={(event, newValue) => {
              setRating(newValue ?? 0);
            }}
          />
          <Typography pl={1}>({rating} stars)</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            multiline
            rows={4}
            variant="filled"
            value={notes}
            fullWidth
            onChange={(event) => setNotes(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
          <LoadingButton
            variant="contained"
            onClick={saveRanking}
            disabled={!isValid}
            loading={createLoading || updateLoading}
          >
            SAVE
          </LoadingButton>
        </Grid>
      </Grid>
      {otherRankings &&
        otherRankings.map((ranking) => (
          <OtherRanking key={ranking.id} group={group} ranking={ranking} />
        ))}
    </>
  );
};

export default ItemRankings;

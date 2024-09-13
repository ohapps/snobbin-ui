import { Group, Ranking } from '@/types/group';
import { getGroupMember, getSnobIdentifier } from '@/utils/snobUtils';
import { Divider, Grid, Rating, Typography } from '@mui/material';

const OtherRanking = ({
  group,
  ranking,
}: {
  group: Group;
  ranking: Ranking;
}) => {
  const groupMember = getGroupMember(group, ranking);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Divider sx={{ mt: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>{getSnobIdentifier(groupMember?.snob)}</Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Rating
          value={ranking.rank}
          precision={group.increments}
          max={group.maxRanking}
          readOnly
        />
        <Typography pl={1}>({ranking.rank} stars)</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontStyle: 'italic' }}>{ranking.notes}</Typography>
      </Grid>
    </Grid>
  );
};

export default OtherRanking;

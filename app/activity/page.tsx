import { Grid } from '@mui/material';
import PendingInvites from './PendingInvites';

const ActivityPage = () => {
  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={6}>
        <PendingInvites />
      </Grid>
    </Grid>
  );
};

export default ActivityPage;

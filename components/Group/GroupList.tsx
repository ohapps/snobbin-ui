import { Group } from '@/types/group';
import { Grid } from '@mui/material';
import GroupCard from './GroupCard';

interface Props {
  groups: Group[];
}

const GroupList = ({ groups }: Props) => {
  return (
    <Grid container spacing={2}>
      {groups.map((group) => (
        <Grid item xs={12} sm={6} md={4} key={group.id}>
          <GroupCard group={group} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupList;

import { Grid } from '@mui/material';
import GroupCard from './GroupCard';
import { Group } from '@/types/group';
import ItemList from '../GroupItem/ItemList';

interface Props {
  group: Group;
}

const GroupDetails = ({ group }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <GroupCard group={group} expanded />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ItemList group={group} />
      </Grid>
    </Grid>
  );
};

export default GroupDetails;

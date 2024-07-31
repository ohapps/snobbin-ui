import { Grid } from '@mui/material';
import GroupCard from '../GroupCard';
import { Group } from '@/app/_common/types/group';
import ItemList from './ItemList';

interface Props {
  group: Group;
}

const GroupDetails = ({ group }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item md={4}>
        <GroupCard group={group} expanded />
      </Grid>
      <Grid item flex={1}>
        <ItemList group={group} />
      </Grid>
    </Grid>
  );
};

export default GroupDetails;

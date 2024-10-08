'use client';

import { useQuery } from '@apollo/client';
import { PENDING_GROUP_INVITES } from '../../graphql/queries';
import { PendingGroupInvites } from '../../types/group';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  styled,
  Divider,
  Skeleton,
  List,
} from '@mui/material';
import PendingInvite from './PendingInvite';

const Card = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  paddingBottom: theme.spacing(2),
}));

const PendingInvites = () => {
  const { loading, data } = useQuery<PendingGroupInvites>(
    PENDING_GROUP_INVITES
  );

  return (
    <Card>
      <CardContent>
        <Title>Pending Invites</Title>
        <Divider />
        {loading && <Skeleton variant="rounded" width={250} height={60} />}
        {!loading && !data?.getPendingGroupInvites.length && (
          <Typography sx={{ padding: 1 }}>No pending invites</Typography>
        )}
        <List>
          {data?.getPendingGroupInvites.map((invite) => (
            <PendingInvite key={invite.id} invite={invite} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PendingInvites;

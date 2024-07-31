import { Group, Role } from '@/app/_common/types/group';
import { AppRoutes } from '@/app/_common/config/appRoutes';
import GroupCardMenu from './GroupCardMenu';
import {
  CardContent as MuiCardContent,
  Card as MuiCard,
  styled,
  Typography,
  Avatar as MuiAvatar,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { getGroupInitials } from '../_common/utils/snobUtils';
import useCurrentGroupMember from '../_common/hooks/useCurrentGroupMember';
import GroupMembers from './[groupId]/GroupMembers';

const Card = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: 0,
  ':hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: 0,
  ':last-child': {
    paddingBottom: 0,
  },
}));

const Info = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const Description = styled(Typography)(({ theme }) => ({}));

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  fontSize: '22px',
  backgroundColor: theme.palette.primary.dark,
}));

const CardLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  color: theme.palette.grey[800],
  paddingRight: theme.spacing(2),
  flex: 1,
  padding: theme.spacing(4),
}));

interface Props {
  group: Group;
  expanded?: boolean;
}

const GroupCard = ({ group, expanded = false }: Props) => {
  const groupMember = useCurrentGroupMember(group);
  return (
    <Card>
      <CardContent>
        <CardLink href={`${AppRoutes.GROUPS}/${group.id}`}>
          <Avatar>{getGroupInitials(group)}</Avatar>
          <Info>
            <Title>{group.name}</Title>
            <Description>{group.description}</Description>
          </Info>
        </CardLink>
        {groupMember?.role === Role.ADMIN && <GroupCardMenu group={group} />}
      </CardContent>
      {expanded && <GroupMembers group={group} />}
    </Card>
  );
};

export default GroupCard;

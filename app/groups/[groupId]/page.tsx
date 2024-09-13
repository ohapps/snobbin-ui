'use client';

import PageInitializer from '@/components/Page/PageInitializer';
import { MY_GROUPS } from '@/graphql/queries';
import { MyGroups } from '@/types/group';
import { useQuery } from '@apollo/client';
import GroupDetails from '../../../components/Group/GroupDetails';
import GroupDetailsHeader from '../../../components/Group/GroupDetailsHeader';
import ItemDrawer from '../../../components/GroupItem/ItemDrawer';

const GroupPage = ({ params }: { params: { groupId: string } }) => {
  const { loading, error, data } = useQuery<MyGroups>(MY_GROUPS);
  const group = data?.myGroups.find((grp) => grp.id === params.groupId);
  return (
    <PageInitializer loading={loading} error={error}>
      <GroupDetailsHeader />
      {group && (
        <>
          <GroupDetails group={group} />
          <ItemDrawer group={group} />
        </>
      )}
    </PageInitializer>
  );
};

export default GroupPage;

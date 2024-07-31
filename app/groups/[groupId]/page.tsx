'use client';

import PageInitializer from '@/app/_common/components/Page/PageInitializer';
import { MY_GROUPS } from '@/app/_common/graphql/queries';
import { MyGroups } from '@/app/_common/types/group';
import { useQuery } from '@apollo/client';
import GroupDetails from './GroupDetails';
import GroupDetailsHeader from './GroupDetailsHeader';
import ItemDrawer from './ItemDrawer';

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

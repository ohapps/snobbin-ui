'use client';

import { useQuery } from '@apollo/client';
import { MY_GROUPS } from '../../graphql/queries';
import { MyGroups } from '../../types/group';
import GroupList from '../../components/Group/GroupList';
import PageInitializer from '../../components/Page/PageInitializer';
import GroupHeader from '../../components/Group/GroupHeader';

const Groups = () => {
  const { loading, error, data } = useQuery<MyGroups>(MY_GROUPS);
  return (
    <PageInitializer loading={loading} error={error}>
      <GroupHeader />
      <GroupList groups={data?.myGroups ?? []} />
    </PageInitializer>
  );
};

export default Groups;

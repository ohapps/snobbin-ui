'use client';

import { useQuery } from '@apollo/client';
import { MY_GROUPS } from '../_common/graphql/queries';
import { MyGroups } from '../_common/types/group';
import GroupList from './GroupList';
import PageInitializer from '../_common/components/Page/PageInitializer';
import GroupHeader from './GroupHeader';

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

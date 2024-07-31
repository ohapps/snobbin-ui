'use client';

import GroupForm from './GroupForm';
import { useReactiveVar } from '@apollo/client';
import { selectedGroup } from '../_common/apollo/reactiveVariables';
import BottomDrawer from '../_common/components/Drawer/BottomDrawer';

const GroupDrawer = () => {
  const group = useReactiveVar(selectedGroup);

  const closeDrawer = () => {
    selectedGroup(undefined);
  };

  return (
    <BottomDrawer
      title={`${group?.id ? 'Edit' : 'New'} Group`}
      open={!!group}
      close={closeDrawer}
    >
      {group && <GroupForm group={group} onSave={() => closeDrawer()} />}
    </BottomDrawer>
  );
};

export default GroupDrawer;

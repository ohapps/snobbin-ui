'use client';

import { useReactiveVar } from '@apollo/client';
import BottomDrawer from '../Drawer/BottomDrawer';
import { selectedGroup } from '@/apollo/reactiveVariables';
import GroupForm from './GroupForm';

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

import BottomDrawer from '@/components/Drawer/BottomDrawer';
import { useReactiveVar } from '@apollo/client';
import ItemForm from './ItemForm';
import { Group } from '@/types/group';
import { editingRankingItem } from '@/apollo/reactiveVariables';

const ItemDrawer = ({ group }: { group: Group }) => {
  const rankingItem = useReactiveVar(editingRankingItem);

  const closeDrawer = () => {
    editingRankingItem(undefined);
  };

  return (
    <BottomDrawer
      title={`${rankingItem?.id ? 'Edit' : 'New'} Item`}
      open={!!rankingItem}
      close={closeDrawer}
    >
      {rankingItem && (
        <ItemForm
          rankingGroup={group}
          rankingItem={rankingItem}
          onSave={closeDrawer}
        />
      )}
    </BottomDrawer>
  );
};

export default ItemDrawer;

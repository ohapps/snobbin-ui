import FullActionButton from '@/components/Form/FullActionButton';
import { CREATE_RANKING_ITEM, UPDATE_RANKING_ITEM } from '@/graphql/mutations';
import { MY_GROUPS, SEARCH_RANKING_ITEMS } from '@/graphql/queries';
import { Group, RankingItem } from '@/types/group';
import { useMutation } from '@apollo/client';
import { Grid, TextField, styled } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
}));

const ItemForm = ({
  rankingItem,
  rankingGroup,
  onSave,
}: {
  rankingItem: RankingItem;
  rankingGroup: Group;
  onSave: () => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createRankingItem, { loading: createLoading }] =
    useMutation(CREATE_RANKING_ITEM);
  const [updateRankingItem, { loading: updateLoading }] =
    useMutation(UPDATE_RANKING_ITEM);
  const [description, setDescription] = useState(rankingItem.description);
  const [attributes, setAttributes] = useState(
    rankingItem.attributes.map((attr) => ({
      id: attr.id,
      attributeId: attr.attributeId,
      attributeValue: attr.attributeValue,
    })) ?? []
  );
  const isItemValid = description;

  const onCompleted = () => {
    enqueueSnackbar('Item saved successfully', { variant: 'success' });
    onSave();
  };

  const onError = () => {
    enqueueSnackbar('Failed to save item', { variant: 'error' });
  };

  const saveItem = () => {
    if (isItemValid) {
      if (rankingItem.id) {
        updateRankingItem({
          variables: {
            id: rankingItem.id,
            description,
            attributes,
          },
          refetchQueries: [MY_GROUPS, SEARCH_RANKING_ITEMS],
          onCompleted,
          onError,
        });
      } else {
        createRankingItem({
          variables: {
            groupId: rankingGroup.id,
            description,
            attributes,
          },
          refetchQueries: [MY_GROUPS, SEARCH_RANKING_ITEMS],
          onCompleted,
          onError,
        });
      }
    }
  };

  const getAttributeValue = (id: string) => {
    return (
      attributes?.find((attr) => attr.attributeId === id)?.attributeValue ?? ''
    );
  };

  const setAttributeValue = (id: string, value: string) => {
    const existingAttribute = attributes?.find(
      (attr) => attr.attributeId === id
    );
    if (existingAttribute) {
      const otherAttributes = attributes?.filter(
        (attr) => attr.attributeId !== id
      );
      setAttributes([
        ...otherAttributes,
        {
          ...existingAttribute,
          attributeValue: value,
        },
      ]);
    } else {
      setAttributes([
        ...attributes,
        { id: '', attributeId: id, attributeValue: value },
      ]);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          id="description"
          label="Description"
          value={description}
          fullWidth
          autoFocus
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />
      </Grid>
      {rankingGroup.attributes?.map((attr) => (
        <Grid item xs={12} md={6} key={attr.id}>
          <StyledTextField
            id={attr.id}
            label={attr.name}
            value={getAttributeValue(attr.id)}
            fullWidth
            autoFocus
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAttributeValue(attr.id, event.target.value)
            }
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <FullActionButton
          loading={createLoading || updateLoading}
          disabled={!isItemValid}
          onClick={saveItem}
        >
          SAVE ITEM
        </FullActionButton>
      </Grid>
    </Grid>
  );
};

export default ItemForm;

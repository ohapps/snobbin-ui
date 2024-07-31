import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  styled,
} from '@mui/material';
import { GroupAttribute } from '../_common/types/group';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
}));

const AttributeList = styled(List)(({ theme }) => ({
  border: '1px solid ' + theme.palette.grey[400],
  borderRadius: '5px',
  height: '210px',
  overflowY: 'auto',
}));

const AttributeItem = styled(ListItem)(({ theme }) => ({
  padding: '0px 10px 0px 10px',
}));

const newAttribute: GroupAttribute = {
  id: '',
  name: '',
};

const GroupAttributes = ({
  groupAttributes,
  setGroupAttributes,
}: {
  groupAttributes: GroupAttribute[];
  setGroupAttributes: (groupAttributes: GroupAttribute[]) => void;
}) => {
  const [selectedAttribute, setSelectedAttribute] =
    useState<GroupAttribute>(newAttribute);

  const handleSave = () => {
    const newAttributes = groupAttributes.filter(
      (attribute) =>
        attribute.id === '' || attribute.id !== selectedAttribute.id
    );
    setGroupAttributes([...newAttributes, selectedAttribute]);
    setSelectedAttribute(newAttribute);
  };

  const handleDelete = (attribute: GroupAttribute) => {
    setGroupAttributes(
      groupAttributes.filter(
        (attr) => !(attr.id === attribute.id && attr.name === attribute.name)
      )
    );
  };

  return (
    <Box>
      <StyledTextField
        label="Attribute Name"
        value={selectedAttribute.name}
        fullWidth
        onChange={(e) =>
          setSelectedAttribute({ ...selectedAttribute, name: e.target.value })
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="save attribute"
                disabled={selectedAttribute.name === ''}
                onClick={handleSave}
                edge="end"
              >
                <SaveIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <AttributeList>
        {groupAttributes.map((attribute) => (
          <AttributeItem
            key={`attribute-${attribute.id}-${attribute.name}`}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(attribute)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <IconButton
                aria-label="edit"
                onClick={() => setSelectedAttribute(attribute)}
              >
                <EditIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText>{attribute.name}</ListItemText>
          </AttributeItem>
        ))}
      </AttributeList>
    </Box>
  );
};

export default GroupAttributes;

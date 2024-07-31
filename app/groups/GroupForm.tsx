import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  styled,
} from '@mui/material';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import FullActionButton from '../_common/components/Form/FullActionButton';
import { useMutation } from '@apollo/client';
import {
  CREATE_RANKING_GROUP,
  UPDATE_RANKING_GROUP,
} from '../_common/graphql/mutations';
import { MY_GROUPS } from '../_common/graphql/queries';
import { useSnackbar } from 'notistack';
import { Group } from '../_common/types/group';
import GroupAttributes from './GroupAttributes';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
}));

const StyledTextArea = styled(TextField)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
  '& .MuiInputBase-multiline': {
    height: '138px',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
}));

const GroupForm = ({ group, onSave }: { group: Group; onSave: () => void }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createRankingGroup, { loading: createLoading }] =
    useMutation(CREATE_RANKING_GROUP);
  const [updateRankingGroup, { loading: updateLoading }] =
    useMutation(UPDATE_RANKING_GROUP);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const [rankingsRequired, setRankingsRequired] = useState(
    group.rankingsRequired
  );
  const [minRanking, setMinRanking] = useState(group.minRanking);
  const [maxRanking, setMaxRanking] = useState(group.maxRanking);
  const [increment, setIncrement] = useState(group.increments.toString());
  const [rankIcon, setRankIcon] = useState(group.rankIcon);
  const [groupAttributes, setGroupAttributes] = useState(
    group.attributes?.map((attr) => ({ id: attr.id, name: attr.name })) ?? []
  );

  const groupIsValid =
    name &&
    description &&
    minRanking >= 0 &&
    maxRanking > minRanking &&
    increment &&
    rankIcon &&
    rankingsRequired >= 0;

  const saveGroup = () => {
    if (groupIsValid) {
      if (group.id) {
        updateRankingGroup({
          variables: {
            id: group.id,
            name,
            description,
            minRanking,
            maxRanking,
            increment: +increment,
            rankIcon,
            rankingsRequired,
            attributes: groupAttributes,
          },
          refetchQueries: [MY_GROUPS],
          onCompleted: () => {
            enqueueSnackbar('Group saved successfully', { variant: 'success' });
            onSave();
          },
          onError: () => {
            enqueueSnackbar('Failed to save group', { variant: 'error' });
          },
        });
      } else {
        createRankingGroup({
          variables: {
            name,
            description,
            minRanking,
            maxRanking,
            increment: +increment,
            rankIcon,
            rankingsRequired,
            attributes: groupAttributes,
          },
          refetchQueries: [MY_GROUPS],
          onCompleted: () => {
            enqueueSnackbar('Group saved successfully', { variant: 'success' });
            onSave();
          },
          onError: () => {
            enqueueSnackbar('Failed to save group', { variant: 'error' });
          },
        });
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <StyledTextField
          id="name"
          label="Name"
          value={name}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
        <StyledTextArea
          id="description"
          label="Description"
          value={description}
          fullWidth
          multiline
          rows={4}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />
        <StyledTextField
          id="rankingsRequired"
          label="Rankings Required"
          value={rankingsRequired}
          type="number"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = Math.round(+event.target.value);
            if (newValue >= 1 && newValue < 100) {
              setRankingsRequired(newValue);
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledTextField
          id="minRanking"
          label="Minimum Ranking"
          value={minRanking}
          type="number"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newRanking = Math.round(+event.target.value);
            if (newRanking >= 0 && newRanking < maxRanking) {
              setMinRanking(newRanking);
            }
          }}
        />
        <StyledTextField
          id="maxRanking"
          label="Maximum Ranking"
          value={maxRanking}
          type="number"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newRanking = Math.round(+event.target.value);
            if (newRanking <= 20 && newRanking > +minRanking) {
              setMaxRanking(newRanking);
            }
          }}
        />
        <StyledFormControl fullWidth>
          <InputLabel id="increment-label">Increment</InputLabel>
          <Select
            id="increment"
            labelId="increment-label"
            label="Increment"
            value={increment}
            onChange={(event: SelectChangeEvent) => {
              setIncrement(event.target.value);
            }}
          >
            <MenuItem value={'0.5'}>.5</MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <InputLabel id="rank-icon-label">Ranking Icon</InputLabel>
          <Select
            id="rankIcon"
            labelId="rank-icon-label"
            label="Ranking Icon"
            value={rankIcon}
            onChange={(event: SelectChangeEvent) => {
              setRankIcon(event.target.value);
            }}
          >
            <MenuItem value={'star'}>
              <StarIcon />
            </MenuItem>
            <MenuItem value={'favorite'}>
              <FavoriteIcon />
            </MenuItem>
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <GroupAttributes
          groupAttributes={groupAttributes}
          setGroupAttributes={setGroupAttributes}
        />
      </Grid>
      <Grid item xs={12}>
        <FullActionButton
          loading={createLoading || updateLoading}
          disabled={!groupIsValid}
          onClick={saveGroup}
        >
          SAVE GROUP
        </FullActionButton>
      </Grid>
    </Grid>
  );
};

export default GroupForm;

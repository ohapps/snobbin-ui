import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const SearchBox = ({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: (value: string) => void;
}) => {
  return (
    <Container>
      <TextField
        placeholder="Search…"
        size="small"
        value={keyword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(event.target.value)
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setKeyword('')} disabled={!keyword}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default SearchBox;

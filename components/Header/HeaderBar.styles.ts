import { styled } from "@mui/material";
import { Toolbar as MuiToolbar } from '@mui/material';


export const HeaderItemsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    justifyContent: 'space-between',
}));
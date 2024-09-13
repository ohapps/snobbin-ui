import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.common.black,
    width: theme.spacing(12),
}));

export const Container = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));
import { styled } from "@mui/material";
import Link from "next/link";

export const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.common.black,
    width: theme.spacing(12),
}));

export const Container = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));
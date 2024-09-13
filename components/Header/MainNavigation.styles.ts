import { styled } from "@mui/material";
import Link from "next/link";

export const NavLink = styled(Link)(({ theme }) => ({
    margin: theme.spacing(2),
    textDecoration: 'none',
    color: theme.palette.common.white,
}));

export const Container = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));
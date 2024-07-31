import { Typography, styled } from "@mui/material";

export const LogoText = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(4),
    fontWeight: theme.typography.fontWeightBold,
}));
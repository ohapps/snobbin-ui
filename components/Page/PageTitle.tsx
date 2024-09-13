import { styled, Typography } from '@mui/material';

export const Title = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return <Title variant="h4">{title}</Title>;
};

export default PageTitle;

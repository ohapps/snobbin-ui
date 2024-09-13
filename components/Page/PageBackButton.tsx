'use client';

import BackIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';
import { IconButton, styled } from '@mui/material';

export const Button = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent',
  },
  fontSize: theme.typography.h6.fontSize,
  marginBottom: theme.spacing(2),
}));

const PageBackButton = ({
  title,
  backUrl,
}: {
  title: string;
  backUrl: string;
}) => {
  const router = useRouter();

  const onBack = () => {
    router.push(backUrl);
  };

  return (
    <Button onClick={onBack}>
      <BackIcon /> {title}
    </Button>
  );
};

export default PageBackButton;

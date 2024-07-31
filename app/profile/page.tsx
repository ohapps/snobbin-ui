'use client';

import { useQuery } from '@apollo/client';
import { UserInfo } from '../_common/types/snob';
import { USER_INFO } from '../_common/graphql/queries';
import PageInitializer from '../_common/components/Page/PageInitializer';
import PageTitle from '../_common/components/Page/PageTitle';
import EditProfileForm from './EditProfileForm';
import { Box, styled } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.sm,
  padding: theme.spacing(2),
  margin: 'auto',
}));

const Page = () => {
  const { data, loading, error } = useQuery<UserInfo>(USER_INFO);
  return (
    <PageInitializer loading={loading} error={error}>
      <Container>
        <PageTitle title="Edit Profile" />
        {data && <EditProfileForm snob={data.userInfo} />}
      </Container>
    </PageInitializer>
  );
};

export default Page;

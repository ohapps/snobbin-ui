import { TextField, styled } from '@mui/material';
import { Snob } from '../../types/snob';
import { useState } from 'react';
import FullActionButton from '../Form/FullActionButton';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../graphql/mutations';
import { MY_GROUPS, USER_INFO } from '../../graphql/queries';
import { useSnackbar } from 'notistack';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const EditProfileForm = ({ snob }: { snob: Snob }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
  const [firstName, setFirstName] = useState(snob.firstName ?? '');
  const [lastName, setLastName] = useState(snob.lastName ?? '');
  const isProfileValid = firstName && lastName;

  const saveProfile = () => {
    updateProfile({
      variables: {
        firstName,
        lastName,
      },
      refetchQueries: [MY_GROUPS, USER_INFO],
      onCompleted: () => {
        enqueueSnackbar('Profile updated successfully', {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar('Failed to update profile', { variant: 'error' });
      },
    });
  };

  return (
    <>
      <StyledTextField
        id="email"
        label="Email"
        value={snob.email}
        fullWidth
        disabled
      />
      <StyledTextField
        id="firstName"
        label="First Name"
        value={firstName}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFirstName(event.target.value)
        }
      />
      <StyledTextField
        id="lastName"
        label="Last Name"
        value={lastName}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setLastName(event.target.value)
        }
      />
      <FullActionButton
        loading={loading}
        disabled={!isProfileValid}
        onClick={saveProfile}
      >
        SAVE PROFILE
      </FullActionButton>
    </>
  );
};

export default EditProfileForm;

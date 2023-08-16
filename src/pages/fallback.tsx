import { ROUTE_HOME } from '@constants/routes';
import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';

const FallbackPage: FC = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(ROUTE_HOME);
  };

  return (
    <Stack direction='column' alignItems='center'>
      <Stack direction='column' alignItems='center'>
        <img className='responsiveImage' src='/images/error_dinosaur.png' alt='Error dinosaur' />
      </Stack>
      <Stack direction='column' alignItems='start' spacing={2.5}>
        <Typography variant='h4'>Ups, something went wrong.</Typography>
        <Typography variant='body1'>The page you tried to access does not exist.</Typography>
        <Button onClick={navigateHome} variant='outlined'>
          Go home
        </Button>
      </Stack>
    </Stack>
  );
};

export default FallbackPage;

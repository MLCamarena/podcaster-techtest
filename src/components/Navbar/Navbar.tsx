import Appbar from '@components-ui/Appbar/Appbar';
import { ROUTE_HOME } from '@constants/routes';
import { Toolbar, Stack, Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { selectedNavigationLoading } from '@store/selectors/loading.selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isNavigationLoading = useSelector(selectedNavigationLoading);
  return (
    <Appbar color='secondary' position='static'>
      <Toolbar
        variant='dense'
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Stack width='100%' maxWidth='960px' direction='row' alignItems='center' spacing={2}>
          <Avatar alt='Podcast Icon' src='/images/mlcamarena_podcast_logo.png' />
          <Link to={ROUTE_HOME} className='hidden-link'>
            <Typography variant='h6' fontWeight='bold'>
              Podcaster
            </Typography>
          </Link>
          <Box flexGrow={1}></Box>
          {isNavigationLoading && <CircularProgress size={30} thickness={8} />}
        </Stack>
      </Toolbar>
    </Appbar>
  );
};

export default Navbar;

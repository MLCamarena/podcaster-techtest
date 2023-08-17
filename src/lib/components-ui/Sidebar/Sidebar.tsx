import { ROUTE_PODCAST } from '@constants/routes';
import { PodcastDetailed } from '@models/podcast.model';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type SiderbarProps = {
  podcast: PodcastDetailed;
};

const Sidebar: FC<SiderbarProps> = ({ podcast }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 1,
        gap: 2,
      }}
    >
      <Link to={`/${ROUTE_PODCAST}/${podcast.id}`}>
        <img src={podcast.coverImage} height='170px' width='170px' />
      </Link>
      <Divider orientation='horizontal' variant='middle' flexItem />
      <Stack px={1.5} width='250px'>
        <Link to={`/${ROUTE_PODCAST}/${podcast.id}`} className='hidden-link'>
          <Typography variant='h6' fontWeight='bold' maxWidth='250px'>
            {podcast.name}
          </Typography>
        </Link>
        <Link to={`/${ROUTE_PODCAST}/${podcast.id}`} className='hidden-link'>
          <Typography variant='body2' maxWidth='250px'>
            by {podcast.artist}
          </Typography>
        </Link>
      </Stack>
      <Divider orientation='horizontal' variant='middle' flexItem />
      <Box
        px={1.5}
        sx={{
          maxWidth: '250px',
          wordBreak: 'break-word',
        }}
      >
        {podcast?.summary}
      </Box>
    </Paper>
  );
};

export default Sidebar;

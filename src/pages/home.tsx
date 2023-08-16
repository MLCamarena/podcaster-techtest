import PodcastList from '@components/PodcastList/PodcastList';
import { Box } from '@mui/material';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <Box maxWidth='960px' mt={5}>
      <PodcastList />
    </Box>
  );
};

export default HomePage;

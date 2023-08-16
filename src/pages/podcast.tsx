import SidebarWrapper from '@components/Sidebar/SidebarWrapper';
import { Box } from '@mui/material';
import { FC } from 'react';

const PodcastPage: FC = () => {
  return (
    <Box maxWidth='960px' mt={5}>
      <SidebarWrapper></SidebarWrapper>
    </Box>
  );
};

export default PodcastPage;

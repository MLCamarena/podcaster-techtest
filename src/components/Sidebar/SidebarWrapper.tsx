import Sidebar from '@components-ui/Sidebar/Sidebar';
import { PodcastDetailed } from '@models/podcast.model';
import { Stack } from '@mui/material';
import { selectDetailedPodcast } from '@store/selectors/podcastList.selector';
import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const SidebarWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { podcastId } = useParams();
  const selectedPodcast = useSelector(selectDetailedPodcast(podcastId || ''));

  return (
    !!selectedPodcast && (
      <Stack
        sx={{ width: '100%' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'start', sm: 'center' }}
        alignItems={{ xs: 'center', sm: 'start' }}
        spacing={5}
      >
        <Stack width='275px'>
          <Sidebar podcast={selectedPodcast as PodcastDetailed} />
        </Stack>
        <Stack height='auto' width='100%'>
          {children}
        </Stack>
      </Stack>
    )
  );
};

export default SidebarWrapper;

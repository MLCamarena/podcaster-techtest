import Sidebar from '@components-ui/Sidebar/Sidebar';
import { PodcastDetailed } from '@models/podcast.model';
import { Box, Stack } from '@mui/material';
import { selectIsLoading } from '@store/selectors/loading.selectors';
import { selectLastListFetch, selectSelectedPodcast } from '@store/selectors/podcastList.selector';
import { getPodcastDetailedRequest } from '@store/slices/podcast.slice';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const DetailsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { podcastId } = useParams();
  const selectedPodcast = useSelector(selectSelectedPodcast);
  const lastUpdate = useSelector(selectLastListFetch);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    podcastId && dispatch(getPodcastDetailedRequest(podcastId));
  }, [podcastId, lastUpdate]);

  return (
    <Box maxWidth='960px' mt={5}>
      <Stack
        sx={{ width: '100%' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'start', md: 'center' }}
        alignItems={{ xs: 'center', md: 'start' }}
        spacing={5}
      >
        {isLoading && (
          <img
            className='responsiveImage rotate'
            alt='Podcast Loading Icon'
            src='/images/mlcamarena_podcast_logo.png'
          />
        )}
        {!!selectedPodcast && !isLoading && 'lastFetch' in selectedPodcast && (
          <>
            <Stack width='275px'>
              <Sidebar podcast={selectedPodcast as PodcastDetailed} />
            </Stack>
            <Stack height='auto' width='100%'>
              {children}
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default DetailsWrapper;

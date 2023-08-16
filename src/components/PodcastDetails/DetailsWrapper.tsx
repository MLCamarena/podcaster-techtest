import Sidebar from '@components-ui/Sidebar/Sidebar';
import { PodcastDetailed } from '@models/podcast.model';
import { Box, Stack } from '@mui/material';
import { selectPodcastFromList } from '@store/selectors/podcastList.selector';
import { getPodcastDetailedRequest } from '@store/slices/podcast.slice';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const DetailsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { podcastId } = useParams();
  const selectedPodcast = useSelector(selectPodcastFromList(podcastId || ''));
  const dispatch = useDispatch();

  useEffect(() => {
    podcastId && dispatch(getPodcastDetailedRequest(podcastId));
  }, [podcastId]);

  return (
    <Box maxWidth='960px' mt={5}>
      {!!selectedPodcast && (
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
      )}
    </Box>
  );
};

export default DetailsWrapper;

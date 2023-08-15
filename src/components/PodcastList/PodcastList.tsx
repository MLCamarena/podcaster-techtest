import PodcastCard from '@components-ui/PodcastCard/PodcastCard';
import { Stack } from '@mui/material';
import { getPodcastListRequest } from '@store/slices/podcast.slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const PodcastList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPodcastListRequest());
  }, []);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'start' }}
      justifyContent='center'
      useFlexGap
      flexWrap='wrap'
      columnGap={4}
      rowGap={8}
    >
      <PodcastCard />
      <PodcastCard />
      <PodcastCard />
      <PodcastCard />
      <PodcastCard />
      <PodcastCard />
      <PodcastCard />
      <PodcastCard />
    </Stack>
  );
};

export default PodcastList;

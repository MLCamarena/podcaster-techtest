import PodcastCard from '@components-ui/PodcastCard/PodcastCard';
import { PodcastListItem } from '@models/podcast.model';
import { Stack } from '@mui/material';
import { selectedNavigationLoading } from '@store/selectors/loading.selectors';
import { selectPodcastList } from '@store/selectors/podcastList.selector';
import { getPodcastListRequest } from '@store/slices/podcast.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PodcastList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectedNavigationLoading);
  const podcastList = useSelector(selectPodcastList);

  useEffect(() => {
    dispatch(getPodcastListRequest());
  }, []);

  const handlePodcastCardClick = (podcastId: string): void => {
    console.log(podcastId);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'stretch' }}
      justifyContent='center'
      useFlexGap
      flexWrap='wrap'
      columnGap={4}
      rowGap={8}
    >
      {isLoading && (
        <img className='responsiveImage rotate' alt='Podcast Loading Icon' src='/images/mlcamarena_podcast_logo.png' />
      )}
      {!isLoading &&
        !!podcastList.length &&
        podcastList.map((item: PodcastListItem) => (
          <PodcastCard onClick={handlePodcastCardClick} key={item.id} podcast={item} />
        ))}
    </Stack>
  );
};

export default PodcastList;

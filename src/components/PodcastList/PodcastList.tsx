import PodcastCard from '@components-ui/PodcastCard/PodcastCard';
import { ROUTE_PODCAST } from '@constants/routes';
import { PodcastListItem } from '@models/podcast.model';
import { Stack } from '@mui/material';
import { selectIsLoading } from '@store/selectors/loading.selectors';
import { selectPodcastList } from '@store/selectors/podcastList.selector';
import { getPodcastListRequest, setSelectedPodcast } from '@store/slices/podcast.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const PodcastList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const podcastList = useSelector(selectPodcastList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPodcastListRequest());
  }, []);

  const handlePodcastCardClick = (podcastId: string): void => {
    dispatch(setSelectedPodcast(podcastId));
    navigate(`/${ROUTE_PODCAST}/${podcastId}`);
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

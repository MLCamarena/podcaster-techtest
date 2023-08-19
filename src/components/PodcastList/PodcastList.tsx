import PodcastCard from '@components-ui/PodcastCard/PodcastCard';
import { ROUTE_PODCAST } from '@constants/routes';
import usePodcastSearch from '@hooks/usePodcastSearch';
import { PodcastListItem } from '@models/podcast.model';
import { Chip, Stack, TextField } from '@mui/material';
import { selectIsLoading } from '@store/selectors/loading.selectors';
import { selectPodcastList } from '@store/selectors/podcastList.selector';
import { getPodcastListRequest, setSelectedPodcast } from '@store/slices/podcast.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import PodcastsIcon from '@mui/icons-material/Podcasts';

const PodcastList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const podcastList = useSelector(selectPodcastList);
  const navigate = useNavigate();
  const { list, searchTerm, setOriginalList, setSearchTerm } = usePodcastSearch();

  useEffect(() => {
    dispatch(getPodcastListRequest());
  }, []);

  useEffect(() => {
    setOriginalList(podcastList || []);
  }, [podcastList]);

  const handlePodcastCardClick = (podcastId: string): void => {
    dispatch(setSelectedPodcast(podcastId));
    navigate(`/${ROUTE_PODCAST}/${podcastId}`);
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {!isLoading && (
        <Stack
          sx={{ marginBottom: 10 }}
          width='100%'
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          spacing={2}
        >
          <Chip data-cy='podcastsChip' icon={<PodcastsIcon />} label={list.length} color='primary' />
          <TextField
            size='small'
            value={searchTerm}
            onChange={handleSearchFieldChange}
            label='Filter podcasts'
            variant='outlined'
          />
        </Stack>
      )}

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
          <img
            className='responsiveImage rotate'
            alt='Podcast Loading Icon'
            src='/images/mlcamarena_podcast_logo.png'
          />
        )}
        {!isLoading &&
          !!podcastList.length &&
          list.map((item: PodcastListItem) => (
            <PodcastCard onClick={handlePodcastCardClick} key={item.id} podcast={item} />
          ))}
      </Stack>
    </>
  );
};

export default PodcastList;

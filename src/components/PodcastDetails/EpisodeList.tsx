import EpisodeCount from '@components-ui/EpisodeCount/EpisodeCount';
import EpisodeTable from '@components-ui/EpisodeTable/EpisodeTable';
import { PodcastDetailed } from '@models/podcast.model';
import { Stack } from '@mui/material';
import { selectSelectedPodcast } from '@store/selectors/podcastList.selector';
import { FC } from 'react';
import { useSelector } from 'react-redux';

const EpisodeList: FC = () => {
  const selectedPodcast = useSelector(selectSelectedPodcast) as PodcastDetailed;

  return (
    <Stack direction='column' spacing={3} alignItems='center'>
      <EpisodeCount episodeCount={selectedPodcast.totalEpisodes} />
      <EpisodeTable episodes={selectedPodcast.episodes} episodeCount={selectedPodcast.totalEpisodes} />
    </Stack>
  );
};

export default EpisodeList;

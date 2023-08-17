import EpisodeCard from '@components-ui/EpisodeCard/EpisodeCard';
import { selectSelectedEpisode } from '@store/selectors/podcastList.selector';
import { setSelectedEpisode } from '@store/slices/podcast.slice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const EpisodeDetails: FC = () => {
  const { episodeId } = useParams();
  const selectedEpisode = useSelector(selectSelectedEpisode);
  const dispatch = useDispatch();

  useEffect(() => {
    episodeId && dispatch(setSelectedEpisode(episodeId));
  }, [episodeId]);

  return selectedEpisode && <EpisodeCard episode={selectedEpisode} />;
};

export default EpisodeDetails;

import { RootState } from '@store/index';
import { createSelector } from '@reduxjs/toolkit';
import { PodcastDetailed } from '@models/podcast.model';
import { Episode } from '@models/episode.model';

const getPodcastsContext = (state: RootState) => state.podcasts;

const selectPodcastList = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext?.podcastList);
const selectLastListFetch = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext?.lastFetch);
const selectedPodcastId = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext?.selectedPodcast);
const selectedEpisodeId = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext?.selectedEpisode);

const selectSelectedPodcast = createSelector(selectPodcastList, selectedPodcastId, (podcastList, selectedPodcastId) =>
  podcastList.find((item) => item.id === selectedPodcastId),
);

const selectSelectedEpisode = createSelector(selectSelectedPodcast, selectedEpisodeId, (podcast, episodeId) => {
  const selectedPodcastDetailed = podcast as PodcastDetailed;
  return selectedPodcastDetailed?.episodes.find((episode: Episode) => episode.id === episodeId);
});

const selectPodcastFromList = (podcastId: string) =>
  createSelector(selectPodcastList, (podcastList) => podcastList?.find((item) => item.id === podcastId));

export { selectPodcastList, selectLastListFetch, selectPodcastFromList, selectSelectedPodcast, selectSelectedEpisode };

import { RootState } from '@store/index';
import { createSelector } from '@reduxjs/toolkit';

const getPodcastsContext = (state: RootState) => state.podcasts;

const selectPodcastList = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext.podcastList);
const selectLastListFetch = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext.lastFetch);
const selectedPodcastId = createSelector(getPodcastsContext, (podcastsContext) => podcastsContext.selectedPodcast);

const selectSelectedPodcast = createSelector(selectPodcastList, selectedPodcastId, (podcastList, selectedPodcastId) =>
  podcastList.find((item) => item.id === selectedPodcastId),
);
const selectPodcastFromList = (podcastId: string) =>
  createSelector(selectPodcastList, (podcastList) => podcastList.find((item) => item.id === podcastId));

export { selectPodcastList, selectLastListFetch, selectPodcastFromList, selectSelectedPodcast };

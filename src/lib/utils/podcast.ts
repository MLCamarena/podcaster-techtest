import { PodcastListItem } from '@models/podcast.model';

const mergePodcastList = (currentList: PodcastListItem[], newList: PodcastListItem[]): PodcastListItem[] => {
  return newList.map((newPodcast: PodcastListItem) => {
    const detailedPodcastToKeep = currentList.find((currentPodcast) => currentPodcast.id === newPodcast.id);
    return {
      ...(detailedPodcastToKeep || newPodcast),
    };
  });
};

export { mergePodcastList };

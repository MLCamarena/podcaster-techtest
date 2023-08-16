import { APIImage, APIPodcastListItem, APIPodcastListResponse } from '@models/api/podcasts';
import { PodcastListItem } from '@models/podcast.model';

const getBiggestImage = (apiImages: APIImage[]): string => {
  return apiImages.reduce((prevImage: APIImage, currImage: APIImage) => {
    if (Number(currImage?.attributes?.height) > Number(prevImage?.attributes?.height)) {
      return currImage;
    } else {
      return prevImage;
    }
  }, apiImages[0]).label;
};

const mergePodcastList = (currentList: PodcastListItem[], newList: PodcastListItem[]): PodcastListItem[] => {
  return newList.map((newPodcast: PodcastListItem) => {
    const detailedPodcastToKeep = currentList.find(
      (currentPodcast: PodcastListItem) => currentPodcast.id === newPodcast.id,
    );
    return {
      ...(detailedPodcastToKeep || newPodcast),
    };
  });
};

const mapApiPodcastList = (apiPodcastList: APIPodcastListResponse): PodcastListItem[] => {
  const {
    feed: { entry },
  } = apiPodcastList;
  return entry.map((item: APIPodcastListItem) => ({
    id: item.id.attributes['im:id'],
    name: item['im:name'].label,
    artist: item['im:artist'].label,
    coverImage: getBiggestImage(item['im:image']),
  }));
};

export { mergePodcastList, mapApiPodcastList };

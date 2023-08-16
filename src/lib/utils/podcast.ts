import {
  APIImage,
  APIPodcastDetailResponse,
  APIPodcastDetailResult,
  APIPodcastEpisode,
  APIPodcastListItem,
  APIPodcastListResponse,
  APIPodcastWrapper,
} from '@models/api/podcasts';
import { Episode } from '@models/episode.model';
import { PodcastListItem, Podcast, PodcastDetailed } from '@models/podcast.model';

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
    summary: item.summary.label,
  }));
};

const mapApiEpisodes = (episodes: APIPodcastEpisode[]): Episode[] => {
  return episodes.map((ep: APIPodcastEpisode) => {
    return {
      id: `${ep.trackId}`,
      episodeName: ep.trackName,
      duration: ep.trackTimeMillis,
      releaseDate: new Date(ep.releaseDate).getTime(),
      rawDescription: ep.description,
      mediaUrl: ep.episodeUrl,
    };
  });
};

const mapApiPodcastDetail = (apiPodcastDetail: APIPodcastDetailResponse, currentPodcast: Podcast): PodcastDetailed => {
  const { results } = apiPodcastDetail;
  const podcastDetails = results.find(
    (item: APIPodcastDetailResult) => item.wrapperType === 'track',
  ) as APIPodcastWrapper;
  const episodes = results.filter(
    (item: APIPodcastDetailResult) => item.wrapperType === 'podcastEpisode',
  ) as APIPodcastEpisode[];

  return {
    ...currentPodcast,
    lastFetch: Date.now(),
    totalEpisodes: podcastDetails.trackCount,
    episodes: mapApiEpisodes(episodes),
  };
};

export { mergePodcastList, mapApiPodcastList, mapApiPodcastDetail };

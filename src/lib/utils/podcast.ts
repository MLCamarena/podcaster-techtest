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

/**
 * Get a list of APIImage type and returns the string of the biggest one in resolution
 * @param apiImages collection of APIImage
 * @returns string with the biggest image url
 */
const getBiggestImage = (apiImages: APIImage[]): string => {
  return apiImages.reduce((prevImage: APIImage, currImage: APIImage) => {
    if (Number(currImage?.attributes?.height) > Number(prevImage?.attributes?.height)) {
      return currImage;
    } else {
      return prevImage;
    }
  }, apiImages[0]).label;
};

/**
 * Join two PodcastListItem lists, in order to persist detailed podcasts which are in both lists.
 * @param currentList Current podcast list
 * @param newList New podcast list
 * @returns A new PodcastListItem collection
 */
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

/**
 * Transform an array of APIPodcastListResponse into PodcastListItem array
 * @param apiPodcastList API response for podcast list
 * @returns Custom type podcast list
 */
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

/**
 * Transform an array of APIPodcastEpisode into Episode array
 * @param episodes API response for episodes
 * @returns Custom type episode list
 */
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

/**
 * Transform and merge the APIPodcastDetailResponse api response and Podcast simple type into a PodcastDetailed object
 * @param apiPodcastDetail API response for podcast details
 * @param currentPodcast Current podcast in simplifyed type Podcast
 * @returns Custom type detailed podcast
 */
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

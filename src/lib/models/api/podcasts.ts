type APIImage = {
  label: string;
  attributes: { height: string };
};

type APIPodcastListItem = {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  'im:name': {
    label: string;
  };
  'im:image': APIImage[];
  'im:artist': {
    label: string;
  };
  summary: {
    label: string;
  };
};

type APIPodcastListFeed = {
  entry: APIPodcastListItem[];
};

type APIPodcastListResponse = {
  feed: APIPodcastListFeed;
};

type APIPodcastWrapper = {
  trackCount: number;
  wrapperType: 'track';
};

type APIPodcastEpisode = {
  wrapperType: 'podcastEpisode';
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  releaseDate: string;
  description: string;
  episodeUrl: string;
};

type APIPodcastDetailResult = APIPodcastWrapper | APIPodcastEpisode;

type APIPodcastDetailResponse = {
  resultCount: number;
  results: APIPodcastDetailResult[];
};

export type {
  APIImage,
  APIPodcastListItem,
  APIPodcastListFeed,
  APIPodcastListResponse,
  APIPodcastDetailResponse,
  APIPodcastDetailResult,
  APIPodcastWrapper,
  APIPodcastEpisode,
};

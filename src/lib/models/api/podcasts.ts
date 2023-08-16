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
};

type APIPodcastListFeed = {
  entry: APIPodcastListItem[];
};

type APIPodcastListResponse = {
  feed: APIPodcastListFeed;
};

export type { APIImage, APIPodcastListItem, APIPodcastListFeed, APIPodcastListResponse };

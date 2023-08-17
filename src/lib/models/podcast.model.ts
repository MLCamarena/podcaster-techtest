import { Episode } from './episode.model';

export type Podcast = {
  id: string;
  name: string;
  artist: string;
  coverImage: string;
  summary: string;
};

export type PodcastDetailed = {
  id: string;
  name: string;
  artist: string;
  coverImage: string;
  summary: string;
  totalEpisodes: number;
  episodes: Episode[];
  lastFetch: number;
};

export type PodcastListItem = Podcast | PodcastDetailed;

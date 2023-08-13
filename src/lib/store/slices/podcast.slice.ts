import { Episode } from '@models/episode.model';
import { PodcastDetailed, PodcastListItem } from '@models/podcast.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Error = {
  errorCode: number;
  errorMsg: string;
};

type PodcastState = {
  loading: boolean;
  podcastList: PodcastListItem[];
  error?: Error;
  lastFetch?: number;
  selectedPodcast?: PodcastDetailed['id'];
  selectedEpisode?: Episode['id'];
};

const initialState: PodcastState = {
  loading: false,
  podcastList: [],
};

const loading = createSlice({
  name: '[@PODCAST]',
  initialState,
  reducers: {
    getPodcastListRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getPodcastListSuccess: (state, action: PayloadAction<PodcastListItem[]>) => {
      return {
        ...state,
        loading: false,
        podcastList: action.payload,
        error: undefined,
      };
    },
    getPodcastListError: (state, action: PayloadAction<Error>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { getPodcastListRequest, getPodcastListSuccess, getPodcastListError } = loading.actions;
export default loading.reducer;

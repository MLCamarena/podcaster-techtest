import { Episode } from '@models/episode.model';
import Error from '@models/networkError.model';
import { PodcastDetailed, PodcastListItem } from '@models/podcast.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergePodcastList } from '@utils/podcast';

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
        error: undefined,
      };
    },
    getPodcastListSuccess: (state, action: PayloadAction<PodcastListItem[]>) => {
      return {
        ...state,
        loading: false,
        podcastList: mergePodcastList(state.podcastList, action.payload),
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

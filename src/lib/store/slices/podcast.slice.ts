import { Episode } from '@models/episode.model';
import { PodcastDetailed, PodcastListItem } from '@models/podcast.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergePodcastList } from '@utils/podcast';

type PodcastState = {
  podcastList: PodcastListItem[];
  error?: string;
  lastFetch?: number;
  selectedPodcast?: PodcastDetailed['id'];
  selectedEpisode?: Episode['id'];
};

const initialState: PodcastState = {
  podcastList: [],
};

const loading = createSlice({
  name: '[@PODCAST]',
  initialState,
  reducers: {
    getPodcastListRequest: (state) => {
      return {
        ...state,
        error: undefined,
      };
    },
    getPodcastListSuccess: (state, action: PayloadAction<PodcastListItem[]>) => {
      return {
        ...state,
        podcastList: mergePodcastList(state.podcastList, action.payload),
        lastFetch: Date.now(),
        error: undefined,
      };
    },
    getPodcastListError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    setSelectedPodcast: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedPodcast: action.payload,
      };
    },
    getPodcastDetailedRequest: (state) => {
      return {
        ...state,
        error: undefined,
      };
    },
    getPodcastDetailedSuccess: (state, action: PayloadAction<PodcastDetailed>) => {
      return {
        ...state,
        error: undefined,
        podcastList: state.podcastList.map((item: PodcastListItem) => {
          if (item.id === action.payload.id) {
            const { summary, totalEpisodes, episodes, lastFetch } = action.payload;
            return {
              ...item,
              summary,
              totalEpisodes,
              episodes,
              lastFetch,
            } as PodcastDetailed;
          } else return item;
        }),
      };
    },
    getPodcastDetailedError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const {
  getPodcastListRequest,
  getPodcastListSuccess,
  getPodcastListError,
  setSelectedPodcast,
  getPodcastDetailedRequest,
  getPodcastDetailedSuccess,
  getPodcastDetailedError,
} = loading.actions;
export default loading.reducer;

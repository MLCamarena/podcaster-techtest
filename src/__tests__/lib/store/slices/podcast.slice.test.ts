import reducer, {
  getPodcastListRequest,
  getPodcastListSuccess,
  getPodcastListError,
  setSelectedPodcast,
  setSelectedEpisode,
  getPodcastDetailedRequest,
  getPodcastDetailedSuccess,
  getPodcastDetailedError,
} from '@store/slices/podcast.slice';

describe('Podcast slice', () => {
  test('Should be checked as initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      podcastList: [],
    });
  });

  test('getPodcastListRequest', () => {
    const initialState = { podcastList: [], error: 'HTTP Error' };
    const action = { type: getPodcastListRequest.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ podcastList: [], error: undefined });
  });

  test('getPodcastListSuccess', () => {
    const initialState = { podcastList: [], error: 'HTTP Error' };
    const newPodcasts = [
      {
        id: '1',
        name: 'Amazing Podcast',
        artist: 'Camarena',
        coverImage: 'cheems.jpg',
        summary: 'Not as amazing as before',
      },
    ];
    const action = { type: getPodcastListSuccess.type, payload: newPodcasts };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      podcastList: newPodcasts,
      lastFetch: expect.any(Number),
      error: undefined,
    });
  });

  test('getPodcastListError', () => {
    const initialState = { podcastList: [], error: undefined };
    const action = { type: getPodcastListError.type, payload: 'HTTP Error' };
    const state = reducer(initialState, action);
    expect(state).toEqual({ podcastList: [], error: 'HTTP Error' });
  });

  test('setSelectedPodcast', () => {
    const initialState = { podcastList: [], selectedPodcast: undefined };
    const action = { type: setSelectedPodcast.type, payload: '1' };
    const state = reducer(initialState, action);
    expect(state).toEqual({ podcastList: [], selectedPodcast: '1' });
  });

  test('setSelectedEpisode', () => {
    const initialState = { podcastList: [], selectedEpisode: undefined };
    const action = { type: setSelectedEpisode.type, payload: '1' };
    const state = reducer(initialState, action);
    expect(state).toEqual({ podcastList: [], selectedEpisode: '1' });
  });

  test('getPodcastDetailedRequest', () => {
    const initialState = { podcastList: [], error: 'HTTP Error', selectedPodcast: '1' };
    const action = { type: getPodcastDetailedRequest.type, payload: '2' };
    const state = reducer(initialState, action);
    expect(state).toEqual({ podcastList: [], error: undefined, selectedPodcast: '2' });
  });

  test('getPodcastDetailedSuccess', () => {
    const initialState = { podcastList: [], error: undefined };
    const currentPodcast = {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'cheems.jpg',
      summary: 'Not as amazing as before',
    };
    const updatedPodcast = {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'cheems.jpg',
      summary: 'Still amazing',
      totalEpisodes: 5,
      episodes: [],
      lastFetch: 123456789,
    };
    const action = { type: getPodcastDetailedSuccess.type, payload: updatedPodcast };
    const state = reducer({ ...initialState, podcastList: [currentPodcast] }, action);
    expect(state).toEqual({
      podcastList: [
        {
          ...currentPodcast,
          totalEpisodes: 5,
          episodes: [],
          lastFetch: 123456789,
        },
      ],
      error: undefined,
    });
  });

  test('getPodcastDetailedError', () => {
    const initialState = { podcastList: [], error: undefined };
    const action = { type: getPodcastDetailedError.type, payload: 'HTTP Error' };
    const state = reducer(initialState, action);
    expect(state).toEqual({ podcastList: [], error: 'HTTP Error' });
  });
});

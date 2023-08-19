import { RootState } from '@store/index';
import {
  selectPodcastList,
  selectLastListFetch,
  selectPodcastFromList,
  selectSelectedPodcast,
  selectSelectedEpisode,
} from '@store/selectors/podcastList.selector';
import { PodcastListItem } from '@models/podcast.model';
import { Episode } from '@models/episode.model';

describe('Selectors', () => {
  const initialState: RootState = {
    loading: {
      isLoading: false,
    },
    podcasts: {
      podcastList: [
        {
          id: '1',
          name: 'Amazing Podcast',
          artist: 'Camarena',
          coverImage: 'cheems.jpg',
          summary: 'An amazing podcast.',
          lastFetch: 1234,
          episodes: [
            {
              id: '1',
              episodeName: 'Episode 1',
              duration: 1800000,
              releaseDate: 1629878400000,
              rawDescription: 'An amazing episode.',
              mediaUrl: 'episode1.mp3',
            },
          ],
          totalEpisodes: 5,
        },
        {
          id: '2',
          name: 'Another Podcast',
          artist: 'Rodríguez',
          coverImage: 'cheems.jpg',
          summary: 'Another great podcast.',
        },
      ],
      lastFetch: 123456789,
      selectedPodcast: '1',
      selectedEpisode: '1',
    },
  };
  test('selectPodcastList should return the podcastList from state', () => {
    const result = selectPodcastList(initialState);
    const expected: PodcastListItem[] = [
      {
        id: '1',
        name: 'Amazing Podcast',
        artist: 'Camarena',
        coverImage: 'cheems.jpg',
        summary: 'An amazing podcast.',
        lastFetch: 1234,
        episodes: [
          {
            id: '1',
            episodeName: 'Episode 1',
            duration: 1800000,
            releaseDate: 1629878400000,
            rawDescription: 'An amazing episode.',
            mediaUrl: 'episode1.mp3',
          },
        ],
        totalEpisodes: 5,
      },
      {
        id: '2',
        name: 'Another Podcast',
        artist: 'Rodríguez',
        coverImage: 'cheems.jpg',
        summary: 'Another great podcast.',
      },
    ];
    expect(result).toEqual(expected);
  });

  test('selectLastListFetch should return the lastFetch from state', () => {
    const result = selectLastListFetch(initialState);
    const expected = 123456789;
    expect(result).toEqual(expected);
  });

  test('selectPodcastFromList should return the selected podcast from the podcastList', () => {
    const result = selectPodcastFromList('1')(initialState);
    const expected: PodcastListItem = {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'cheems.jpg',
      summary: 'An amazing podcast.',
      lastFetch: 1234,
      episodes: [
        {
          id: '1',
          episodeName: 'Episode 1',
          duration: 1800000,
          releaseDate: 1629878400000,
          rawDescription: 'An amazing episode.',
          mediaUrl: 'episode1.mp3',
        },
      ],
      totalEpisodes: 5,
    };
    expect(result).toEqual(expected);
  });

  test('selectSelectedPodcast should return the selected podcast from the podcastList', () => {
    const result = selectSelectedPodcast(initialState);
    const expected: PodcastListItem = {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'cheems.jpg',
      summary: 'An amazing podcast.',
      lastFetch: 1234,
      episodes: [
        {
          id: '1',
          episodeName: 'Episode 1',
          duration: 1800000,
          releaseDate: 1629878400000,
          rawDescription: 'An amazing episode.',
          mediaUrl: 'episode1.mp3',
        },
      ],
      totalEpisodes: 5,
    };
    expect(result).toEqual(expected);
  });

  test('selectSelectedEpisode should return the selected episode from the selected podcast', () => {
    const result = selectSelectedEpisode(initialState);
    const expected: Episode = {
      id: '1',
      episodeName: 'Episode 1',
      duration: 1800000,
      releaseDate: 1629878400000,
      rawDescription: 'An amazing episode.',
      mediaUrl: 'episode1.mp3',
    };
    expect(result).toEqual(expected);
  });
});

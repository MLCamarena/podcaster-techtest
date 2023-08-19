import {
  getBiggestImage,
  mergePodcastList,
  mapApiPodcastList,
  mapApiEpisodes,
  mapApiPodcastDetail,
} from '@utils/podcast';

describe('Podcast utils utils', () => {
  test('getBiggestImage', () => {
    const images = [
      { label: 'smaller', attributes: { height: '100' } },
      { label: 'bigger', attributes: { height: '150' } },
      { label: 'medium', attributes: { height: '120' } },
    ];

    const result = getBiggestImage(images);
    expect(result).toBe('bigger');
  });

  test('mergePodcastList', () => {
    const currentList = [
      {
        id: '1',
        name: 'Amazing Podcast, but old',
        artist: 'Camarena',
        coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
        summary: 'Trust me, is amazing.',
        lastFetch: 12345,
        episodes: [],
        totalEpisodes: 1,
      },
      {
        id: '2',
        name: 'Another Podcast',
        artist: 'Rodríguez',
        coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
        summary: 'Another great podcast.',
      },
    ];

    const newList = [
      {
        id: '1',
        name: 'Amazing Podcast, but updated',
        artist: 'Camarena',
        coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
        summary: 'Trust me, is amazing.',
      },
      {
        id: '3',
        name: 'Another Podcast, but this will persist',
        artist: 'Paco',
        coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
        summary: 'Another great podcast.',
      },
    ];

    const result = mergePodcastList(currentList, newList);

    const expectedMerge = [
      {
        id: '1',
        name: 'Amazing Podcast, but old',
        artist: 'Camarena',
        coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
        summary: 'Trust me, is amazing.',
        lastFetch: 12345,
        episodes: [],
        totalEpisodes: 1,
      },
      {
        id: '3',
        name: 'Another Podcast, but this will persist',
        artist: 'Paco',
        coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
        summary: 'Another great podcast.',
      },
    ];

    expect(result).toEqual(expectedMerge);
  });

  test('mapApiPodcastList', () => {
    const apiResponse = {
      feed: {
        entry: [
          {
            id: { attributes: { 'im:id': '1' } },
            'im:name': { label: 'Amazing Podcast' },
            'im:image': [{ label: 'cheems.jpg', attributes: { height: '100' } }],
            'im:artist': { label: 'Camarena' },
            summary: { label: 'Not as amazing as before' },
          },
        ],
      },
    };

    const result = mapApiPodcastList(apiResponse);

    const expectedResult = [
      {
        id: '1',
        name: 'Amazing Podcast',
        artist: 'Camarena',
        coverImage: 'cheems.jpg',
        summary: 'Not as amazing as before',
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  test('mapApiEpisodes', () => {
    const apiResponse = [
      {
        wrapperType: 'podcastEpisode' as any,
        trackId: 1,
        trackName: 'Episode 1',
        trackTimeMillis: 12345,
        releaseDate: '2023-08-12T05:30:00Z',
        description: 'Not GOT 1 episode',
        episodeUrl: 'a.mp3',
      },
    ];

    const result = mapApiEpisodes(apiResponse);

    const expected = [
      {
        id: '1',
        episodeName: 'Episode 1',
        duration: 12345,
        releaseDate: new Date('2023-08-12T05:30:00Z').getTime(),
        rawDescription: 'Not GOT 1 episode',
        mediaUrl: 'a.mp3',
      },
    ];

    expect(result).toEqual(expected);
  });

  test('mapApiPodcastDetail', () => {
    const currentPodcast = {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'cheems.jpg',
      summary: 'Not as amazing as before',
    };

    const apiResponse = {
      resultCount: 3,
      results: [
        { wrapperType: 'track' as any, trackCount: 99 },
        {
          wrapperType: 'podcastEpisode' as any,
          trackId: 1,
          trackName: 'Episode 1',
          trackTimeMillis: 12345,
          releaseDate: '2023-08-12T05:30:00Z',
          description: 'Not GOT 1 episode',
          episodeUrl: 'a.mp3',
        },
      ],
    };

    const result = mapApiPodcastDetail(apiResponse, currentPodcast);

    const expected = {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'cheems.jpg',
      summary: 'Not as amazing as before',
      totalEpisodes: 99,
      episodes: [
        {
          id: '1',
          episodeName: 'Episode 1',
          duration: 12345,
          releaseDate: new Date('2023-08-12T05:30:00Z').getTime(),
          rawDescription: 'Not GOT 1 episode',
          mediaUrl: 'a.mp3',
        },
      ],
      lastFetch: expect.any(Number),
    };

    expect(result).toEqual(expected);
  });
});

import usePodcastSearch from '@hooks/usePodcastSearch';
import { renderHook, act } from '@testing-library/react';

describe('usePodcastSearch', () => {
  const originalList = [
    {
      id: '1',
      name: 'Amazing Podcast',
      artist: 'Camarena',
      coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
      summary: 'Trust me, is amazing.',
    },
    {
      id: '2',
      name: 'Another Podcast',
      artist: 'Rodríguez',
      coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
      summary: 'Another great podcast.',
    },
  ];

  test('Should filter using the search term', () => {
    const { result } = renderHook(() => usePodcastSearch());
    act(() => {
      result.current.setOriginalList(originalList);
    });
    act(() => {
      result.current.setSearchTerm('amazing');
    });
    expect(result.current.list).toHaveLength(1);
    expect(result.current.list[0].name).toEqual('Amazing Podcast');
  });

  test('Should reset state when the original list is refreshed', () => {
    const { result } = renderHook(() => usePodcastSearch());
    act(() => {
      result.current.setOriginalList(originalList);
    });
    act(() => {
      result.current.setSearchTerm('Amazing');
    });
    expect(result.current.list).toHaveLength(1);
    act(() => {
      result.current.setOriginalList([]);
    });
    expect(result.current.list).toHaveLength(0);
    expect(result.current.searchTerm).toEqual('');
  });

  test('Should have not equals values when filtering, then equal values with no search term', () => {
    const { result } = renderHook(() => usePodcastSearch());
    act(() => {
      result.current.setOriginalList(originalList);
    });
    act(() => {
      result.current.setSearchTerm('Another');
    });
    expect(result.current.list).not.toEqual(originalList);
    act(() => {
      result.current.setSearchTerm('');
    });
    expect(result.current.list).toEqual(originalList);
  });
});

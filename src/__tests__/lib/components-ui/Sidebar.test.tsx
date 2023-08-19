import Sidebar from '@components-ui/Sidebar/Sidebar';
import { PodcastDetailed } from '@models/podcast.model';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Sidebar', () => {
  const podcast: PodcastDetailed = {
    id: '1',
    name: 'Amazing Podcast',
    artist: 'Camarena',
    coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
    summary: 'Trust me, is amazing.',
    lastFetch: 12345,
    episodes: [],
    totalEpisodes: 1,
  };

  test('Sidebar render properly', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Sidebar podcast={podcast} />
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('Should find title, artist and summary in the screen', () => {
    render(
      <MemoryRouter>
        <Sidebar podcast={podcast} />
      </MemoryRouter>,
    );
    expect(screen.getByText(podcast.name)).toBeInTheDocument();
    expect(screen.getByText(`by ${podcast.artist}`)).toBeInTheDocument();
    expect(screen.getByText(podcast.summary)).toBeInTheDocument();
  });
});

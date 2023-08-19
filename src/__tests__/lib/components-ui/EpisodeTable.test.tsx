import EpisodeTable from '@components-ui/EpisodeTable/EpisodeTable';
import { Episode } from '@models/episode.model';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('EpisodeTable', () => {
  const episode: Episode = {
    id: '123',
    episodeName: 'The Final One',
    duration: 9835000,
    releaseDate: 1692397561388,
    rawDescription: 'Hello',
    mediaUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_651.mp3?dest-id=2422538',
  };

  test('EpisodeTable render properly', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <EpisodeTable episodes={[episode]} episodeCount={1} />
      </MemoryRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('Shows several episodes alert', () => {
    render(
      <MemoryRouter>
        <EpisodeTable episodes={[episode]} episodeCount={50} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Showing only 20 last results.')).toBeInTheDocument();
  });

  test('Does not show several episodes alert', () => {
    render(
      <MemoryRouter>
        <EpisodeTable episodes={[episode]} episodeCount={1} />
      </MemoryRouter>,
    );
    expect(screen.queryByText('Showing only 20 last results.')).not.toBeInTheDocument();
  });

  test('Should find episode title, parsed release date and parsed duration in document', () => {
    render(
      <MemoryRouter>
        <EpisodeTable episodes={[episode]} episodeCount={1} />
      </MemoryRouter>,
    );
    expect(screen.getByText(episode.episodeName)).toBeInTheDocument();
    expect(screen.getByText('19/08/2023')).toBeInTheDocument();
    expect(screen.getByText('02:43:55')).toBeInTheDocument();
  });
});

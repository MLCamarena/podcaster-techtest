import EpisodeCard from '@components-ui/EpisodeCard/EpisodeCard';
import { Episode } from '@models/episode.model';
import { render, screen } from '@testing-library/react';

describe('EpisodeCard', () => {
  const episode: Episode = {
    id: '123',
    episodeName: 'The Final One',
    duration: 123456,
    releaseDate: Date.now(),
    rawDescription: 'Hello',
    mediaUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_651.mp3?dest-id=2422538',
  };
  test('EpisodeCard render properly', () => {
    const { baseElement } = render(<EpisodeCard episode={episode} />);
    expect(baseElement).toBeTruthy();
  });

  test('Should show episode name and episode description', () => {
    render(<EpisodeCard episode={episode} />);
    expect(screen.getByText(episode.episodeName)).toBeInTheDocument();
    expect(screen.getByText(episode.rawDescription)).toBeInTheDocument();
  });
});

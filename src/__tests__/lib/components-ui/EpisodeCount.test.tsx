import EpisodeCount from '@components-ui/EpisodeCount/EpisodeCount';
import { render, screen } from '@testing-library/react';

describe('EpisodeCount', () => {
  test('EpisodeCount render properly', () => {
    const { baseElement } = render(<EpisodeCount episodeCount={3} />);
    expect(baseElement).toBeTruthy();
  });

  test('Should show 3 episodes at episode count', () => {
    render(<EpisodeCount episodeCount={3} />);
    expect(screen.getByText('Episodes: 3')).toBeInTheDocument();
  });

  test('Should show unknown episodes at episode count', () => {
    render(<EpisodeCount episodeCount={0} />);
    expect(screen.getByText('Episodes: Unknown')).toBeInTheDocument();
  });
});

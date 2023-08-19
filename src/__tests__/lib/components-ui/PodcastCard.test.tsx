import PodcastCard from '@components-ui/PodcastCard/PodcastCard';
import { Podcast } from '@models/podcast.model';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

describe('PodcastCard', () => {
  const podcast: Podcast = {
    id: '1',
    name: 'Amazing Podcast',
    artist: 'Camarena',
    coverImage: 'https://a.pinatafarm.com/1139x1138/f55da91a83/cheems.jpg',
    summary: 'Trust me, is amazing.',
  };

  const onClick = vi.fn();

  test('PodcastCard render properly', () => {
    const { baseElement } = render(<PodcastCard podcast={podcast} onClick={onClick} />);
    expect(baseElement).toBeTruthy();
  });

  test('Should call onClick when image is clicked', () => {
    render(<PodcastCard podcast={podcast} onClick={onClick} />);
    const image = screen.getByAltText('Amazing Podcast');
    fireEvent.click(image);
    expect(onClick).toHaveBeenCalled();
  });

  test('Should find title and artist in screen', () => {
    render(<PodcastCard podcast={podcast} onClick={onClick} />);
    expect(screen.getByText(podcast.name)).toBeInTheDocument();
    expect(screen.getByText(podcast.artist)).toBeInTheDocument();
  });
});

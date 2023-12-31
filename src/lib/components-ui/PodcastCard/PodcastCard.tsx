import { Podcast } from '@models/podcast.model';
import { FC } from 'react';
import PodcastPaperCard from './PodcastPaperCard';
import PodcastCardImage from './PodcastCardImage';
import PodcastCardResponsiveText from './PodcastCardResponsiveText';

type PodcastCardProps = {
  podcast: Podcast;
  onClick: (id: string) => void;
};

const PodcastCard: FC<PodcastCardProps> = ({ podcast, onClick }) => {
  return (
    <PodcastPaperCard onClick={() => onClick(podcast.id)} data-cy={`podcast-card-${podcast.id}`}>
      <PodcastCardImage data-cy={podcast.id} src={podcast.coverImage} alt={podcast.name} />
      <PodcastCardResponsiveText
        variant='body2'
        gutterBottom
        sx={{
          fontWeight: 'bold',
          padding: '0px 16px 0px 16px',
        }}
      >
        {podcast.name}
      </PodcastCardResponsiveText>
      <PodcastCardResponsiveText
        variant='caption'
        sx={{
          padding: ' 0px 16px 16px 16px',
        }}
      >
        {podcast.artist}
      </PodcastCardResponsiveText>
    </PodcastPaperCard>
  );
};

export default PodcastCard;

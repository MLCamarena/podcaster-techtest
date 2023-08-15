// import { Podcast } from '@models/podcast.model';
import { FC } from 'react';
import PodcastPaperCard from './PodcastPaperCard';
import PodcastCardImage from './PodcastCardImage';
import PodcastCardResponsiveText from './PodcastCardResponsiveText';

// type PodcastCardProps = {
//   podcast: Podcast | null;
// };

const PodcastCard: FC = () => {
  const podcast = {
    id: '1',
    name: 'Podcast',
    coverImage:
      'https://yt3.googleusercontent.com/ytc/AOPolaTDYBTH6_SM_QfXOcFfX3epfvLVy52aTiaI7-XwEA=s900-c-k-c0x00ffffff-no-rj',
    artist: 'Manuel L Camarena',
  };
  return (
    <PodcastPaperCard>
      <PodcastCardImage src={podcast.coverImage} alt={podcast.name} />
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

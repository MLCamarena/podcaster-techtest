import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

type EpisodeCountProps = {
  episodeCount: number;
};

const EpisodeCount: FC<EpisodeCountProps> = ({ episodeCount }) => {
  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant='h4' sx={{ fontWeight: 'bold', p: 2 }}>
        Episodes: {episodeCount || 'Unknown'}
      </Typography>
    </Paper>
  );
};

export default EpisodeCount;

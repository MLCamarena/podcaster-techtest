import { Episode } from '@models/episode.model';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type EpisodeCardProps = {
  episode: Episode;
};

const EpisodeCard: FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <Stack spacing={2} direction='column' width='100%'>
        <Typography padding={2} variant='h4' sx={{ fontWeight: 'bold', p: 2 }}>
          {episode.episodeName}
        </Typography>
        <Typography padding={2} variant='body2' dangerouslySetInnerHTML={{ __html: episode.rawDescription }} />
        <Box width='100%' padding={2}>
          <audio style={{ width: '90%' }} src={episode.mediaUrl} controls></audio>
        </Box>
      </Stack>
    </Paper>
  );
};

export default EpisodeCard;

import { Paper, styled } from '@mui/material';

const PodcastPaperCard = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '56px',
  width: '200px',
  height: 'auto',
  minHeight: '40px',
  position: 'relative',
});

export default PodcastPaperCard;

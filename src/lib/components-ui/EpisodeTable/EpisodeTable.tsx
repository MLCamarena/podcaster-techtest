import { ROUTE_EPISODE } from '@constants/routes';
import { Episode } from '@models/episode.model';
import { Alert, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getParsedDate, getParsedDuration } from '@utils/date';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type EpisodeTableProps = {
  episodes: Episode[];
  episodeCount: number;
};

const EpisodeTable: FC<EpisodeTableProps> = ({ episodes, episodeCount }) => {
  return (
    <Paper sx={{ width: '100%' }}>
      {episodeCount > 20 && (
        <Alert sx={{ p: 1, m: 1 }} severity='info'>
          Showing only 20 last results.
        </Alert>
      )}
      <Table sx={{ width: '100%', p: 1, borderCollapse: 'unset' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes?.map((episode: Episode, index: number) => (
            <TableRow
              key={episode.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: index % 2 === 0 ? 'whitesmoke' : 'inherit',
              }}
            >
              <TableCell component='th' scope='row'>
                <Link to={`${ROUTE_EPISODE}/${episode.id}`} relative='path'>
                  {episode.episodeName}
                </Link>
              </TableCell>
              <TableCell>{getParsedDate(episode.releaseDate)}</TableCell>
              <TableCell>{getParsedDuration(episode.duration)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default EpisodeTable;

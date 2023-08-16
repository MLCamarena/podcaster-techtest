import { Episode } from '@models/episode.model';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getParsedDate, getParsedDuration } from '@utils/date';
import { FC } from 'react';

type EpisodeTableProps = {
  episodes: Episode[];
};

const EpisodeTable: FC<EpisodeTableProps> = ({ episodes }) => {
  return (
    <Paper sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }}>
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
                {episode.episodeName}
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

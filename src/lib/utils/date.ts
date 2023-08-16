import { PERSISTENCE_MAX_AGE } from '@constants/maxAge';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const checkMaxAgePersistence = (date: number): boolean => {
  const currentTime = Date.now();

  return currentTime - date > PERSISTENCE_MAX_AGE;
};

const getParsedDate = (timestamp: number): string => {
  return timestamp ? dayjs(timestamp).format('DD/MM/YYYY') : 'Unknown';
};

const getParsedDuration = (timestamp: number): string => {
  return timestamp ? dayjs.duration(timestamp).format('HH:mm:ss') : 'Unknown';
};

export { checkMaxAgePersistence, getParsedDate, getParsedDuration };

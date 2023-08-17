import { PERSISTENCE_MAX_AGE } from '@constants/maxAge';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

/**
 * Check if the time elapsed from the received date is within the MAX_AGE period up to today
 * @param date Date as timestamp
 * @returns true or false
 */
const checkMaxAgePersistence = (date: number): boolean => {
  const currentTime = Date.now();

  return currentTime - date > PERSISTENCE_MAX_AGE;
};

/**
 * Gets a date as timestamp and formats to string using standard DD/MM/YYYY format
 * @param timestamp Date as timestamp
 * @returns A string
 */
const getParsedDate = (timestamp: number): string => {
  return timestamp ? dayjs(timestamp).format('DD/MM/YYYY') : 'Unknown';
};

/**
 * Gets a duration as timestamp and formats to string using standard HH:mm:ss format
 * @param timestamp Date as timestamp
 * @returns A string
 */
const getParsedDuration = (timestamp: number): string => {
  return timestamp ? dayjs.duration(timestamp).format('HH:mm:ss') : 'Unknown';
};

export { checkMaxAgePersistence, getParsedDate, getParsedDuration };
